<?php
/**
 * Created by PhpStorm.
 * User: simeo
 * Date: 4/3/2019
 * Time: 1:48 AM
 */

namespace App\Services;


use App\Client;
use App\Country;

class ClientService
{
    public function create($data)
    {
        $country = Country::where("id", $data['country'])->first();

        $client = new Client($data);

        $client->country()->associate($country);

        $client->save();
    }

    public function update(Client $client, $data)
    {
        $country = Country::where("id", $data['country'])->first();

        $client->update($data);

        $client->country()->associate($country);

        $client->save();
    }
}