<?php

namespace App;

use App\Extensions\LocationableTrait;
use App\Extensions\PermissionableTrait;
use App\Extensions\User as Authenticatable;
use DB;
use Hash;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{

    use
        SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['email', 'password', 'firstName', 'lastName'];
    public $dates
        = [
            'created_at',
            'updated_at',
            'deleted_at',
        ];
    public $casts = [];
    public $includes = [];
    public $collectionIncludes = [];
    public $resourcable = ['email', 'firstName', 'lastName'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden
        = [
            'password',
        ];


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