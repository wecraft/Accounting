<?php

namespace App\Http\Resources;

class FileResource extends Resource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function _toArray($request)
    {
        $return = [
            'id'          => $this->id,
            'featured'    => $this->featured,
            'name'        => $this->name,
            'meta'        => $this->meta,
            'description' => $this->meta['description'],
        ];

        $sources = app('fs')->getPublicUrls($this->resource);

        $return += $sources;

        $return += [
            'extension' => $this->vars['orig'],
            'url'       => $sources['orig'],
        ];

        return $return;
    }

}
