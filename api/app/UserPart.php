<?php

namespace App;

class UserPart extends Model
{

    protected $table = 'user_parts';
    protected $fillable
        = [
            'amount',
            'rate',
            'type',
            'date',
            'tax',
            'vat',
        ];
    public $resourcable
        = [
            'amount',
            'rate',
            'type',
            'date',
            'tax',
            'vat',
        ];

    public $dates
        = [
            'created_at',
            'updated_at',
            'date',
        ];

    public function user()
    {
        return $this->belongsTo(User::class);
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
