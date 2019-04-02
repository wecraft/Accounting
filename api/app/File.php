<?php

namespace App;


class File extends Model
{


    protected $casts
        = [
            'meta'     => 'array',
            'vars'     => 'array',
            'featured' => 'boolean',
        ];
    protected $guarded = [];

    public function object()
    {
        return $this->morphTo();
    }

}
