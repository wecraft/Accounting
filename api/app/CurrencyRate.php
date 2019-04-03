<?php

namespace App;

class CurrencyRate extends Model
{

    protected $table = 'currency_rates';
    protected $fillable
        = [
            'rate',
        ];
    public $resourcable
        = [
            "rate",
        ];

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }
}
