<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Resource;
use App\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $chunk = min($request->get('chunk', 100), 500);

        $data = Order::orderBy('date', 'desc')->simplePaginate($chunk);

        return Resource::collection($data, $request->include);
    }

    public function count()
    {

        $count = Order::count();

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
        $order = Order::where('id', $id)->firstOrFail();

        return new Resource($order, $request->include);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OrderService $orderService, $id)
    {
        $data = $request->all();
        $data['pies'][0]['amount'] = $data['pies'][0]['amount'] / 100;
        $data['pies'][1]['amount'] = $data['pies'][1]['amount'] / 100;

        $data['type'] = $data['type'] == 'cost' ? -1 : 1;

        $order = Order::where('id', $id)->firstOrFail();

        $orderService->update($order, $data);

        return new Resource($order, $request->include);
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
