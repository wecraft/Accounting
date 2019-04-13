<?php

namespace App;

class Client extends Model
{

    protected $table = 'clients';
    protected $fillable
        = [
            'name',
            'eik',
            'mol',
            'email',
            'city',
            'address',
            'postCode',
            'company',
            'vat',
            'modelId',
        ];
    public $resourcable
        = [
            'name',
            'eik',
            'mol',
            'email',
            'city',
            'address',
            'postCode',
            'company',
            'vat',
            'modelId',
        ];

    public $includes = ['country'];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
