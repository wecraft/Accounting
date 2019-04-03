<?php

namespace App;

class Account extends Model
{

    protected $table = 'accounts';
    protected $fillable
        = [
            'name',
            "code",
            'meta',
        ];
    public $resourcable
        = [
            "name",
            "code",
            'meta',
        ];

    public $casts
        = [
            'meta' => 'array',
        ];
}
