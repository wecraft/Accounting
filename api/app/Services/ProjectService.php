<?php
/**
 * Created by PhpStorm.
 * User: simeo
 * Date: 4/3/2019
 * Time: 1:07 AM
 */

namespace App\Services;


use App\Client;
use App\Currency;
use App\Project;

class ProjectService
{

    public function create($data)
    {
        $currency = Currency::where('id', $data['currency'])->first();
        $client = Client::where('id', $data['client'])->first();

        $project = new Project($data);

        $project->client()->associate($client);
        $project->currency()->associate($currency);

        $project->save();

        $project->updatePies($data['pies']);

        return $project;
    }

    public function update(Project $project, $data)
    {
        $currency = Currency::where('id', $data['currency'])->first();
        $client = Client::where('id', $data['client'])->first();

        $project->update($data);

        $project->client()->associate($client);
        $project->currency()->associate($currency);

        $project->save();

        $project->updatePies($data['pies']);
    }

    public function updateStatus(Project $project, $status)
    {
        $project->status = $status;

        $project->save();
    }
}