<?php

namespace App;

use App\Extensions\FilableTrait;

class Order extends Model
{

    use FilableTrait;

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
            'other',

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
            'other',
        ];


    public $includes = ['currency', 'account', 'category'];
    public $collectionIncludes = ['projects', 'invoices', 'pies', 'files'];
    public $countIncludes = ['files_count'];

    public function getTypeResourcable()
    {
        return $this->type == -1 ? 'cost' : 'income';
    }

    public function getDateResourcable()
    {
        return strtotime($this->date) * 1000;
    }

    public function setDateAttribute($value)
    {
        $time = strtotime($value);

        $this->attributes['date'] = date('Y-m-d', $time);
    }

    public function scopeSearch($query, $criteria)
    {
        if ($criteria) {
            //            $query->where(function ($q) use ($search) {
            //                $exp = explode(" ", $search);
            //                foreach ($exp as $word) {
            //                    $q->orWhere('desc', 'like', "%$word%");
            //                }
            //            });


            if ($search = $criteria['search']) {
                $exp = explode(" ", $search);
                foreach ($exp as $word) {
                    $query->where('desc', 'like', "%$word%");
                }
            }

            if (!$criteria['income']) {
                $query->where('type', '!=', 1);
            }

            if (!$criteria['expense']) {
                $query->where('type', '!=', -1);
            }

            if ($accounts = $criteria['accounts']) {
                $query->whereIn('account_id', $accounts);
            }

            if ($categories = $criteria['categories']) {
                $query->whereIn('category_id', $categories);
            }

            if ($files = $criteria['files']) {
                if ($files == 'with_files') {
                    $query->whereHas('files');
                } elseif ($files == 'without_files') {
                    $query->whereDoesntHave('files');
                }
            }

            if ($dateFrom = $criteria['dateFrom']) {
                $dateFrom = date('Y-m-d', strtotime($dateFrom));
                $query->where('date', '>=', $dateFrom);
            }

            if ($dateTo = $criteria['dateTo']) {
                $dateTo = date('Y-m-d', strtotime($dateTo));
                $query->where('date', '<=', $dateTo);
            }


        }
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
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

    public function files()
    {
        return $this->morphMany(File::class, 'object');
    }

    public function files_count()
    {
        return $this->hasOne(File::class, 'object_id')
            ->selectRaw('object_id, count(id) as count')
            ->groupBy('object_id');
    }

    public function updatePies($data)
    {
        $this->pies()->delete();
        $this->user_parts()->delete();

        $rate = app('service')->getCurrencyRate($this->currency_id, $this->date);

        foreach ($data as $item) {
            $user = User::where('id', $item['userId'])->first();
            $part = $item['amount'];

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
                    'rate'   => $rate,
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

    public function onDelete()
    {
        $this->projects()->detach();
        $this->invoices()->detach();
        $this->account_parts()->delete();
        $this->pies()->delete();
        $this->user_parts()->delete();
    }

}
