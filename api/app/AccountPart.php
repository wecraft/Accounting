<?php

namespace App;

class AccountPart extends Model
{

    protected $table = 'account_parts';
    protected $fillable
        = [
            'amount',
            'type',
        ];
    public $resourcable
        = [
            'amount',
            'type',
        ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function operation()
    {
        return $this->morphTo();
    }
}
