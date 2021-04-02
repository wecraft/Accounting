<?php
if (!function_exists('array_map_assoc')) {

    function array_map_assoc(callable $f, array $a)
    {
        return array_merge(...array_map($f, array_keys($a), $a));
    }
}


function getCurrencyRate($date, $from, $to)
{

    if($from == $to){
        return 1;
    }

    $client = new \GuzzleHttp\Client(); //GuzzleHttp\Client
//    $result = $client->get("http://api.exchangeratesapi.io/v1/$date", [
//        'query' => [
//            'symbols' => $to,
//            'base'    => $from,
//            'access_key' => config('services.exchange_rates.key')
//        ],
//    ]);
    $result = $client->get("http://api.frankfurter.app/$date", [
        'query' => [
            'to' => $to,
            'from'    => $from,
        ],
    ]);


    $data = $result->getBody()->getContents();

    $data = json_decode($data);

    $rate = $data->rates->$to ?: 1;

    return $rate;
}