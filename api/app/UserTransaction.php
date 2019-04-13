<?php

namespace App;

class UserTransaction extends Model
{

    protected $table = 'user_transactions';
    protected $fillable
        = [
            'amount',
            'desc',
            'modelId',
        ];
    public $resourcable
        = [
            "amount",
            'desc',
        ];

    public $includes = ['user1', 'user2', 'currency'];

    public function user1()
    {
        return $this->belongsTo(User::class);
    }

    public function user2()
    {
        return $this->belongsTo(User::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function user_parts()
    {
        return $this->morphMany(UserPart::class, 'operation');
    }

    public function updateUsers()
    {

        $this->user_parts()->delete();

        $part = new UserPart([
            'amount' => $this->amount,
            'type'   => -1,
            'date'   => date("Y-m-d"),
        ]);

        $part->operation()->associate($this);
        $part->user()->associate($this->user1);
        $part->currency()->associate($this->currency);

        $part->save();


        $part = new UserPart([
            'amount' => $this->amount,
            'type'   => 1,
            'date'   => date("Y-m-d"),
        ]);

        $part->operation()->associate($this);
        $part->user()->associate($this->user2);
        $part->currency()->associate($this->currency);

        $part->save();

    }
}
