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
            'defCurrency',
        ];

    public $casts
        = [
            'meta' => 'array',
        ];

    public function getDefCurrencyResourcable()
    {
        return $this->currency_id;
    }
}
