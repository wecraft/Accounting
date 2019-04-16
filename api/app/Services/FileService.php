<?php

namespace App\Services;

use App\File as FileModel;
use App\Jobs\FlushTempFilesJob;
use App\Model;
use Illuminate\Http\UploadedFile;
use Image;
use Storage;

class FileService
{

    private $tempFolder = 'temp';
    private $registeredAttachKeys = [];

    public function attachFile(Model $object, $fileSrc, $attachKey, $meta = [])
    {
        $fileModel = $this->createFile($fileSrc, $attachKey, $meta);
        $fileModel->object()->associate($object);
        $fileModel->save();

        return $fileModel;
    }

    public function replaceFile(Model $object, $fileSrc, $attachKey, $meta = [])
    {
        if ($fileSrc instanceof FileModel) {
            $fileContent = Storage::get($fileSrc->path);
            $ext = pathinfo($fileSrc->path, PATHINFO_EXTENSION);
            $fileSrc = $this->genTempPath($ext);
            Storage::disk('local')->put($fileSrc, $fileContent);
        }

        //Delete existing key
        $this->deleteObjectFiles($object, $attachKey);

        //Create File
        return $this->attachFile($object, $fileSrc, $attachKey, $meta);
    }

    public function deleteObjectFiles(Model $object, $attachKey = null, $id = null)
    {
        if ($attachKey || $id) {
            $object->load([
                'files' => function ($query) use ($attachKey, $id) {
                    if ($attachKey) {
                        $query->where('attached_on', $attachKey);
                    }
                    if ($id) {
                        $query->where('id', $id);
                    }
                },
            ]);
        } else {
            $object->load("files");
        }
        $object->files->each(function ($fileModel) {
            $this->deleteFileModel($fileModel);
        });
    }

    public function deleteFileModel(FileModel $fileModel)
    {
        $fileModel->delete();
    }

    public function deleteFileModelVars(FileModel $fileModel)
    {
        foreach ((array)$fileModel->vars as $var => $ext) {
            $varPath = $this->getVarPath($var, $fileModel->path, $ext);
            Storage::delete($varPath);
        }
    }

    public function getPublicUrls(FileModel $fileModel)
    {
        $urls = [];

        foreach ((array)$fileModel->vars as $var => $ext) {
            $path = $this->getVarPath($var, $fileModel->path, $ext);
            $url = $this->getPublicUrlFromPath($path);
            $urls[$var] = $url;
        }

        return $urls;
    }

    public function getPublicUrlFromPath($path)
    {
        if (config('filesystems.default') == 'public') {
            $url = asset("storage/$path");
        } else {
            $url = config('filesystems.cdn_root').$path;
        }

        return $url;
    }

    public function genPublicPath($tempPath)
    {
        $origExt = pathinfo($tempPath, PATHINFO_EXTENSION);
        $path = $this->hashName($this->getFolderName(), $origExt);

        return $path;
    }

    public function genTempPath($ext)
    {
        $path = $this->tempFolder.'/'.str_random(32).".".$ext;

        return $path;
    }

    public function deleteTempPath($tempPath)
    {
        Storage::disk('local')->delete($tempPath);
    }

    public function getTempFile($tempPath)
    {
        Storage::disk('local')->delete($tempPath);
    }

    private function createFile($fileSrc, $attachKey, $meta = [])
    {

        $name = "";

        if ($fileSrc instanceof UploadedFile) {
            $tempPath = $fileSrc->store($this->tempFolder, 'local');

            $name = $fileSrc->getClientOriginalName();
        } else {
            if ($fileSrc instanceof FileModel) {
                $fileContent = Storage::get($fileSrc->path);
                $ext = pathinfo($fileSrc->path, PATHINFO_EXTENSION);
                $tempPath = $this->genTempPath($ext);
                Storage::disk('local')->put($tempPath, $fileContent);
                $name = $fileSrc->name;
            } else {
                $tempPath = $fileSrc;
                $name = pathinfo($fileSrc, PATHINFO_BASENAME);
            }
        }

        $size = Storage::disk('local')->size($tempPath);

        $fileData = $this->createFileVars($tempPath, $attachKey, $meta);

        $fileModel = FileModel::create([
            "path"        => $fileData['path'],
            'name'        => $name,
            "size"        => $size,
            "vars"        => $fileData['vars'],
            "meta"        => $meta,
            "attached_on" => $attachKey,
        ]);

        return $fileModel;
    }

    private function hashName($path, $extension)
    {
        if ($path) {
            $path = rtrim($path, '/').'/';
        }

        $hash = str_random(40);

        return $path.$hash.'.'.$extension;
    }

    private function getFolderName()
    {
        return date("Y")."/".date("m");
    }

    private function getVarPath($var, $path, $ext = false)
    {
        $origExt = pathinfo($path, PATHINFO_EXTENSION);
        if ($var == "orig" || $var == $origExt) {
            return $path;
        }
        $ext = $ext ?: $origExt;
        if ($origExt) {
            return str_replace(".$origExt", "_$var.$ext", $path);
        } else {
            return $path;
        }
    }

    private function storeTemp($tempPath, $publicPath)
    {
        Storage::put($publicPath, Storage::disk('local')->get($tempPath));
    }

    private function createFileVars($tempPath, $attachKey, $meta = [])
    {
        $callable = $this->registeredAttachKeys[$attachKey];

        if (is_callable($callable)) {
            $vars = call_user_func($callable, $tempPath, $meta);
        } else {
            $ext = pathinfo($tempPath, PATHINFO_EXTENSION);

            $vars = [
                "orig" => $ext,
            ];
        }

        $publicPath = $this->genPublicPath($tempPath);

        $tempPaths = [];
        foreach ($vars as $var => $ext) {
            $tempVarPath = $this->getVarPath($var, $tempPath, $ext);
            $publicVarPath = $this->getVarPath($var, $publicPath, $ext);
            $this->storeTemp($tempVarPath, $publicVarPath);
            $tempPaths[] = $tempVarPath;
        }
        $tempPaths = array_unique($tempPaths);

        FlushTempFilesJob::dispatchNow($tempPaths);

        return [
            'path' => $publicPath,
            'vars' => $vars,
        ];
    }

    private function cropImage(\Intervention\Image\Image $image, Array $meta = [])
    {
        if ($meta) {
            $width = $image->width();
            $height = $image->height();

            $w = round($meta["w"] * $width);
            $h = round($meta["h"] * $height);
            $x = round($meta["x"] * $width) * (-1);
            $y = round($meta["y"] * $height) * (-1);
            if ($x == 0) {
                $x = 1;
            }
            if ($y == 0) {
                $y = 1;
            }
            $image->crop($w, $h, $x, $y);
        }
    }

    public function attachImageKey($attachKey, $options = [])
    {
        $this->registeredAttachKeys[$attachKey] = function ($tempPath, $meta) use ($options) {
            $image = Image::make(storage_path($tempPath));
            $ext = pathinfo($tempPath, PATHINFO_EXTENSION);

            $vars = [
                "orig" => $ext,
            ];

            $this->cropImage($image, $meta);

            foreach ($options as $option) {
                $var = $option[0];
                $method = $option[1];
                $methodArgs = $option[2];

                $image->$method(...$methodArgs)->save(storage_path($this->getVarPath($var, $tempPath)), 100);

                $vars[$var] = $ext;
            }

            return $vars;
        };
    }

    public function uploadToLibrary($fileSrc)
    {
        if ($fileSrc instanceof UploadedFile) {
            $imageFileName = uniqid('img-').'.'.$fileSrc->getClientOriginalExtension();
            $filePath = 'uploads/'.$imageFileName;

            Storage::put($filePath, file_get_contents($fileSrc));

            return $this->getPublicUrlFromPath($filePath);
        }
    }

}
