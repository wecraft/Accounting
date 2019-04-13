<?php

namespace App;

class Project extends Model
{

    protected $table = 'projects';
    protected $fillable
        = [
            'name',
            'price',
            'status',
            'modelId',
        ];
    public $resourcable
        = [
            "name",
            'price',
            'status',
            'modelId',
        ];

    public $includes = ['currency', 'client'];
    public $collectionIncludes = ['pies', 'orders'];

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function pies()
    {
        return $this->morphMany(UserPie::class, 'model');
    }

    public function orders()
    {
        return $this->morphToMany(Order::class, 'orderable');
    }

    public function updatePies($data)
    {
        $this->pies()->delete();

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

        }


    }
}
