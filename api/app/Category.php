<?php

namespace App;

class Category extends Model
{

    protected $table = 'categories';
    protected $guarded = [];
    public $resourcable
        = [
            'name',
        ];
}
