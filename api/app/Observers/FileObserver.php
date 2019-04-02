<?php

namespace App\Observers;

use App\File as FileModel;

class FileObserver
{

    public function deleting(FileModel $fileModel)
    {
        app('fs')->deleteFileModelVars($fileModel);
    }

}
