<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Resource;
use App\Invoice;
use App\Order;
use Illuminate\Http\Request;

class RegularController extends Controller
{

    public function getOrders(Request $request)
    {
        $chunk = min($request->get('chunk', 100), 500);

        $data = Order::orderBy('date', 'desc')
            ->where(function($q){
                $q->whereHas('files')->orWhere('category_id', '<=', 4);
            })
            ->orderBy('id', 'desc')->simplePaginate($chunk);

        return Resource::collection($data, $request->include);
    }

    public function getOrdersCount()
    {

        $count = Order::whereHas('files')->count();

        return response()->json(['data' => $count]);
    }

    public function getInvoices(Request $request)
    {

        $chunk = min($request->get('chunk', 100), 500);

        $data = Invoice::orderBy('issue_date', 'desc')->orderBy('number', 'desc')->simplePaginate($chunk);

        return Resource::collection($data, $request->include);
    }

    public function getInvoicesCount()
    {

        $count = Invoice::count();

        return response()->json(['data' => $count]);
    }
}
