<?php
if (!function_exists('array_map_assoc')) {

    function array_map_assoc(callable $f, array $a)
    {
        return array_merge(...array_map($f, array_keys($a), $a));
    }
}
