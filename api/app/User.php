<?php

namespace App;

use App\Extensions\LocationableTrait;
use App\Extensions\PermissionableTrait;
use App\Extensions\User as Authenticatable;
use DB;
use Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['email', 'password', 'firstName', 'lastName', 'role'];

    public $casts = [];
    public $includes = [];
    public $collectionIncludes = [];
    public $resourcable = ['email', 'firstName', 'lastName', 'role'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden
        = [
            'password',
        ];

    public function __construct(array $attributes = [])
    {
        if ($this->getFillable() && $attributes) {
            foreach ($attributes as $k => $v) {
                if (!in_array($k, $this->getFillable()) || !$k) {
                    unset($attributes[$k]);
                }
            }
        }

        parent::__construct($attributes);
    }


    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function getNameAttribute()
    {
        return "{$this->firstName} {$this->lastName}";
    }


}