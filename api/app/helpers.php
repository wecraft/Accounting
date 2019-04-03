<?php
if (!function_exists('array_map_assoc')) {

    function array_map_assoc(callable $f, array $a)
    {
        return array_merge(...array_map($f, array_keys($a), $a));
    }
}


function getCurrencyRate($date, $from, $to)
{

    $data = file_get_contents("https://api.exchangeratesapi.io/$date?symbols={$to}&base=${from}");

    $data = json_decode($data);

    $rate = $data->rates->$to ?: 1;

    return $rate;
}