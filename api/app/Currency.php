<?php

namespace App;

class Currency extends Model
{

    protected $table = 'currencies';
    protected $fillable
        = [
            'name',
        ];
    public $resourcable
        = [
            "name",
        ];

}
