<?php
/**
 * Description of ResourceCollection
 *
 * @author Wecraft Media
 */

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection as BaseResourceCollection;

class ResourceCollection extends BaseResourceCollection
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
        return $this->collection;
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
}