<?php
if (!function_exists('array_map_assoc')) {

    function array_map_assoc(callable $f, array $a)
    {
        return array_merge(...array_map($f, array_keys($a), $a));
    }
}


function getCurrencyRate($date, $from, $to)
{

    $client = new \GuzzleHttp\Client(); //GuzzleHttp\Client
    $result = $client->get("https://api.exchangeratesapi.io/$date", [
        'query' => [
            'symbols' => $to,
            'base'    => $from,
        ],
    ]);

    $data = $result->getBody()->getContents();

    $data = json_decode($data);

    $rate = $data->rates->$to ?: 1;

    return $rate;
}