<?php

namespace App\Http\Controllers\Api;

use App\Client;
use App\Http\Controllers\Controller;
use App\Http\Resources\Resource;
use App\Services\ClientService;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->get('chunk')) {
            $chunk = min($request->get('chunk', 100), 500);

            $data = Client::orderBy('id', 'desc')->simplePaginate($chunk);
        } else {
            $data = Client::orderBy('name', 'asc')->get();

        }

        return Resource::collection($data, $request->include);
    }

    public function count()
    {

        $count = Client::count();

        return response()->json(['data' => $count]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, ClientService $clientService)
    {
        $data = $request->all();

        $client = $clientService->create($data);

        return new Resource($client, $request->include);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $client = Client::where('id', $id)->firstOrFail();

        return new Resource($client, $request->include);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClientService $clientService, $id)
    {
        $data = $request->all();

        $client = Client::where('id', $id)->firstOrFail();

        $clientService->update($client, $data);

        return new Resource($client, $request->include);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
