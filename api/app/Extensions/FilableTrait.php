<?php

/**
 * Description of FileTrait
 *
 * @author Wecraft Media
 */

namespace App\Extensions;

trait FilableTrait
{

    public function files()
    {
        return $this->morphMany('App\File', 'object')->orderBy('sort', 'asc')->orderBy('created_at', 'asc');
    }

    public function attachFile($fileSrc, $attachKey = null, $meta = [])
    {
        if (!$attachKey) {
            $attachKey = $this->fileAttachKey ?: 'file';
        }

        return app('fs')->attachFile($this, $fileSrc, $attachKey, $meta);
    }

    public function replaceFile($fileSrc, $attachKey = null, $meta = [])
    {
        if (!$attachKey) {
            $attachKey = $this->fileAttachKey ?: 'file';
        }

        return app('fs')->replaceFile($this, $fileSrc, $attachKey, $meta);
    }

    public function deleteObjectFiles($attachKey = null, $id = null)
    {
        app('fs')->deleteObjectFiles($this, $attachKey, $id);
    }

}
