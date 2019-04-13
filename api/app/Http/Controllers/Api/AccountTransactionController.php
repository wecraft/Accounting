<?php

namespace App\Http\Controllers\Api;

use App\AccountTransaction;
use App\Http\Controllers\Controller;
use App\Http\Resources\Resource;
use App\Services\AccountTransactionService;
use Illuminate\Http\Request;

class AccountTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $chunk = min($request->get('chunk', 100), 500);

        $data = AccountTransaction::orderBy('date', 'desc')->simplePaginate($chunk);

        return Resource::collection($data, $request->include);
    }

    public function count()
    {

        $count = AccountTransaction::count();

        return response()->json(['data' => $count]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, AccountTransactionService $accountTransactionService)
    {
        $transactions = $request->transactions;

        foreach ((array)$transactions as $data) {

            $accountTransactionService->create($data);

        }

        return $this->noContent();
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
        $data = AccountTransaction::where('id', $id)->firstOrFail();

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
    public function update($id, Request $request, AccountTransactionService $accountTransactionService)
    {
        $data = $request->all();

        $trans = AccountTransaction::where('id', $id)->firstOrFail();

        $accountTransactionService->update($trans, $data);

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
        $trans = AccountTransaction::where('id', $id)->firstOrFail();

        $trans->onDelete();

        $trans->delete();

        return $this->noContent();
    }
}
