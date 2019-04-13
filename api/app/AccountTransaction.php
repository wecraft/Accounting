<?php

namespace App;

class AccountTransaction extends Model
{

    protected $table = 'account_transactions';
    protected $fillable
        = [
            'amount1',
            'amount2',
            'date',
            'modelId',
        ];
    public $resourcable
        = [
            "amount1",
            "amount2",
            'date',
        ];

    public $includes = ['account1', 'account2', 'currency1', 'currency2'];

    public function account1()
    {
        return $this->belongsTo(Account::class);
    }

    public function account2()
    {
        return $this->belongsTo(Account::class);
    }

    public function currency1()
    {
        return $this->belongsTo(Currency::class);
    }

    public function currency2()
    {
        return $this->belongsTo(Currency::class);
    }

    public function account_parts()
    {
        return $this->morphMany(AccountPart::class, 'operation');
    }

    public function user_parts()
    {
        return $this->morphMany(UserPart::class, 'operation');
    }

    public function updateAccounts()
    {
        $this->account_parts()->delete();

        $part = new AccountPart([
            'amount' => $this->amount1,
            'type'   => -1,
        ]);
        $part->operation()->associate($this);
        $part->account()->associate($this->account1);
        $part->currency()->associate($this->currency1);
        $part->save();

        $part = new AccountPart([
            'amount' => $this->amount2,
            'type'   => 1,
        ]);
        $part->operation()->associate($this);
        $part->account()->associate($this->account2);
        $part->currency()->associate($this->currency2);
        $part->save();
    }

    public function updateUsers()
    {
        $this->user_parts()->delete();

        $users = User::where("role", 'admin')->get();

        $part = 1 / $users->count();

        $users->each(function ($user) use ($part) {

            $userPart = new UserPart([
                'amount' => $this->amount1 * $part,
                'type'   => -1,
                'date'   => $this->date,
            ]);
            $userPart->currency_id = $this->currency1_id;

            $userPart->user()->associate($user);
            $userPart->operation()->associate($this);

            $userPart->save();

            $userPart = new UserPart([
                'amount' => $this->amount2 * $part,
                'type'   => 1,
                'date'   => $this->date,
            ]);
            $userPart->currency_id = $this->currency2_id;

            $userPart->user()->associate($user);
            $userPart->operation()->associate($this);

            $userPart->save();
        });
    }

    public function onDelete()
    {
        $this->account_parts()->delete();
        $this->user_parts()->delete();
    }
}
