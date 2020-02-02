<?php

namespace App;

class UserPie extends Model
{

    protected $table = 'user_pies';
    protected $fillable
        = [
            'amount',
        ];
    public $resourcable
        = [
            "amount",
            "userId",
        ];

    public function getAmountResourcable()
    {
        return round($this->amount * 100, 1);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function model()
    {
        return $this->morphTo();
    }
}
