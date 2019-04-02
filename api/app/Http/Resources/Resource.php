<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Resource extends JsonResource
{
    /**
     *
     * @var array
     * Relation classes map
     */
    private $relationResources = [];

    public function __construct($resource, $includes = null, $load = true)
    {
        if ($load) {
            $this->parseIncludes($resource, $includes);
        }
        $this->relationResources = config('resources');
        parent::__construct($resource);
    }

    public function toArray($request)
    {
        $data = $this->_toArray($request);

        $dates = [];
        if (is_array($this->resource->dates)) {
            $dates += array_map(function ($item) {
                return camel_case($item);
            }, $this->resource->dates);
        }

        if ($dates) {
            foreach (array_values(array_unique($dates)) as $date) {
                if ($this->resource->$date) {
                    $data[$date] = strtotime($this->resource->$date) * 1000;
                }
            }
        }


        //Include single relation
        if (is_array($this->includes)) {
            $includes = $this->includes;
        } else {
            if (is_array($this->resource->getIncludes())) {
                $includes = $this->resource->getIncludes();
            }
        }

        if ($includes) {
            foreach ($includes as $inc) {

                $method = 'get'.ucfirst(camel_case($inc)).'Include';

                if (method_exists($this->resource, $method)) {
                    $include = $this->resource->$method($inc);
                } else {
                    $include = $inc;
                }

                $resourceClass = $this->relationResources[$inc] ?: Resource::class;

                $data[$inc] = new $resourceClass($this->whenLoaded(snake_case($include)));
            }
        }

        //Include collection relation
        if (is_array($this->collectionIncludes)) {
            $collectionIncludes = $this->collectionIncludes;
        } else {
            if (is_array($this->resource->getCollectionIncludes())) {
                $collectionIncludes = $this->resource->getCollectionIncludes();
            }
        }

        if ($collectionIncludes) {
            foreach ($collectionIncludes as $include) {

                $resourceClass = $this->relationResources[$include] ?: ResourceCollection::class;

                $data[$include] = new $resourceClass($this->whenLoaded(snake_case($include)));
            }
        }

        return $data;
    }

    protected function _toArray($request)
    {
        $data = ['id' => $this->resource->id];

        if ($this->resource->__in_collection) {
            if (is_array($this->collectionResourcable)) {
                $resourcable = $this->collectionResourcable;
            } else {
                if (is_array($this->resource->collectionResourcable)) {
                    $resourcable = $this->resource->collectionResourcable;
                }
            }
        }

        if ($resourcable === null) {
            if (is_array($this->resourcable)) {
                $resourcable = $this->resourcable;
            } else {
                if (is_array($this->resource->resourcable)) {
                    $resourcable = $this->resource->resourcable;
                }
            }
        }

        if ($resourcable) {
            foreach ($resourcable as $k) {
                $method = 'get'.ucfirst(camel_case($k)).'Resourcable';

                if (method_exists($this->resource, $method)) {
                    $value = $this->resource->$method();
                } else {
                    $value = $this->resource->$k;

                    if (is_null($value) && $this->resource->casts[$k] == 'array') {
                        $value = [];
                    }
                }

                $data[$k] = $value;
            }
        }

        if ($this->resource->resourcableArray) {
            foreach ($this->resource->resourcableArray as $k) {
                $method = 'get'.ucfirst(camel_case($k)).'Resourcable';

                if (method_exists($this->resource, $method)) {
                    $values = $this->resource->$method();

                    $data += $values;

                }
            }
        }

        //Add ACL permissions
        $this->addPermissions($data);

        return $data;
    }

    private static function parseIncludes(&$resource, $includes)
    {
        if ($includes && is_string($includes)) {
            $relations = array_map(function ($v) {
                return snake_case(trim($v));
            }, explode(",", $includes));

            if ($relations) {
                $resource->load($relations);
            }
        }
    }

    public static function collection($resource, $includes = '', $load = true)
    {
        $resource->each(function ($res) {
            $res->__in_collection = 1;
        });

        if ($load) {
            self::parseIncludes($resource, $includes);
        }

        return parent::collection($resource);
    }

    private function addPermissions(&$data)
    {
        if ($this->resource->relationLoaded('perm') && $this->resource->relationLoaded('role_perm')) {
            $permissions = [];
            if ($this->resource->perm->id) {
                $acl = $this->resource->perm;
            } else {
                $acl = $this->resource->role_perm;
            }

            foreach ((array)$this->resource->permMap as $k => $v) {
                if ($acl->$v) {
                    $permissions[] = $k;
                }
            }
            $data['perm'] = $permissions;
            $data['perm_id'] = $acl->id;
        }

        //Create permissions for profiles
        if (isset($this->createPerm)) {
            $data['createPerm'] = $this->createPerm;
        }
    }
}