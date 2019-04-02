<?php

namespace App;

use Auth;
use Illuminate\Database\Eloquent\Model as EModel;

class Model extends EModel
{
    /**
     *
     * @var array
     * Populate all relations, you want to be included in the response if it is loaded
     */
    public $includes = null;
    public $collectionIncludes = null;
    public $countIncludes = null;

    /**
     *
     * @var array
     * Populate all properties you want to include in the resource
     */
    //    public $resourcable = [];
    public $collectionResourcable = null;
    public $resourcableArray = [];

    public $dates
        = [
            'created_at',
            'updated_at',
        ];

    public function getAttribute($key)
    {
        return parent::getAttribute(snake_case($key));
    }

    public function setAttribute($key, $value)
    {
        if (is_array($this->dates) && (in_array(snake_case($key), $this->dates) || in_array(camel_case($key), $this->dates))) {
            $value = strtotime($value);
        }

        //Boolean fields
        if (in_array($value, ["0", "no", "false"])) {
            $value = 0;
        }

        return parent::setAttribute(snake_case($key), $value);
    }

    public function updateArrayAttr($col, $key, $value)
    {
        $data = $this->$col;
        $data[$key] = $value;
        $this->$col = $data;
    }

    public function setDeletedAtAttribute($value)
    {
        if ($value === null || $value === "" || $value === 0) {
            $this->attributes['deleted_at'] = null;
        } else {
            $this->attributes['deleted_at'] = $value;
        }
    }

    public function getIncludes()
    {
        return $this->includes;
    }

    public function getCollectionIncludes()
    {
        return $this->collectionIncludes;
    }
}