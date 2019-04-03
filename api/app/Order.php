<?php

namespace App;

class Order extends Model
{

    protected $table = 'orders';
    protected $fillable
        = [
            'type',
            'amount',
            'rate',
            'date',
            'desc',
            'tax',
            'vat',
            'modelId',

        ];
    public $resourcable
        = [
            'type',
            'amount',
            'rate',
            'date',
            'desc',
            'tax',
            'vat',
        ];

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function pies()
    {
        return $this->morphMany(UserPie::class, 'model');
    }

    public function user_parts()
    {
        return $this->morphMany(UserPart::class, 'operation');
    }

    public function account_parts()
    {
        return $this->morphMany(AccountPart::class, 'operation');
    }

    public function invoices()
    {
        return $this->morphedByMany(Invoice::class, 'orderable');
    }

    public function projects()
    {
        return $this->morphedByMany(Project::class, 'orderable');
    }

    public function updatePies($data)
    {
        $this->pies()->delete();
        $this->user_parts()->delete();

        foreach ($data as $item) {
            $user = User::where('id', $item['user'])->first();
            $part = $item['part'];

            if (!$part) {
                continue;
            }

            //Create Pie
            $userPie = new UserPie([
                'amount' => $part,
            ]);
            $userPie->user()->associate($user);
            $userPie->model()->associate($this);

            $userPie->save();


            if ($this->account->code != 'CH') {
                //Create Part
                $amount = $this->amount * $part;

                $userPart = new UserPart([
                    'amount' => $amount,
                    'type'   => $this->type,
                    'date'   => $this->date,
                    'tax'    => $this->tax,
                    'vat'    => $this->vat,
                ]);
                $userPart->currency_id = $this->currency_id;

                $userPart->user()->associate($user);
                $userPart->operation()->associate($this);

                $userPart->save();

            }

        }
    }

    public function updateRels($data)
    {
        $this->projects()->sync($data['projects']);
        $this->invoices()->sync($data['invoices']);
    }

    public function updateAccounts()
    {
        $this->account_parts()->delete();

        $part = new AccountPart([
            'amount' => $this->amount,
            'type'   => $this->type,
        ]);

        $part->operation()->associate($this);
        $part->currency()->associate($this->currency);
        $part->account()->associate($this->account);

        $part->save();
    }

}
