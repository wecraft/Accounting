<?php

namespace App;

class Country extends Model
{

    public $timestamps = false;
    protected $table = 'countries';
    protected $fillable
        = [
            'name',
            "code",
            "zip",
        ];
    public $resourcable
        = [
            "name",
            "code",
            "zip",
        ];

}
