<?php

namespace App;

class Category extends Model
{

    protected $table = 'categories';
    protected $fillable
        = [
            'name',
        ];
    public $resourcable
        = [
            'name',
        ];
}
