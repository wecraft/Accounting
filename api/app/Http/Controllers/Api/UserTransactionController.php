<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Resource;
use App\Services\UserTransactionService;
use App\UserTransaction;
use Illuminate\Http\Request;

class UserTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $chunk = min($request->get('chunk', 100), 500);

        $data = UserTransaction::orderBy('id', 'desc')->simplePaginate($chunk);

        return Resource::collection($data, $request->include);
    }

    public function count()
    {

        $count = UserTransaction::count();

        return response()->json(['data' => $count]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
        $data = UserTransaction::where('id', $id)->firstOrFail();

        return new Resource($data, $request->include);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request, UserTransactionService $userTransactionService)
    {
        $data = $request->all();

        $trans = UserTransaction::where('id', $id)->firstOrFail();

        $userTransactionService->update($trans, $data);

        return new Resource($trans, $request->include);
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
