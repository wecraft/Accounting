<?php

namespace App\Http\Controllers\Api;

use App\Account;
use App\AccountTransaction;
use App\Currency;
use App\Http\Controllers\Controller;
use App\Http\Resources\Resource;
use App\Order;
use App\Services\AccountTransactionService;
use App\Services\OrderService;
use App\User;
use App\UserPie;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use League\Csv\Reader;

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

        $data = Order::orderBy('date', 'desc')->orderBy('id', 'desc')->search($request->search)->simplePaginate($chunk);

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
    public function store(Request $request, OrderService $orderService)
    {
        $orders = $request->orders;

        foreach ((array)$orders as $data) {
            $data['pies'][0]['amount'] = $data['pies'][0]['amount'] / 100;
            $data['pies'][1]['amount'] = $data['pies'][1]['amount'] / 100;

            $data['type'] = $data['type'] == 'cost' ? -1 : 1;

            $orderService->create($data);

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
        $order = Order::where('id', $id)->firstOrFail();

        return new Resource($order, $request->include);
    }

    public function import(Request $request)
    {


        $reader = Reader::createFromPath($request->file->getPathName(), 'r');
        $reader->setHeaderOffset(0);
        $records = $reader->getRecords();

        $accounts = Account::all();
        $currencies = Currency::all();

        $response = [
            'orders'    => [],
            'transfers' => [],
        ];

        $transactions = [];

        $users = User::where("role", "admin")->get();

        foreach ($records as $record) {

            if (strpos($record['desc'], 'ПОКУПКО ПРОДАЖБА') === false) {
                $date = date('Y-m-d', strtotime($record['date']));
                $currency = $currencies->where('name', $record['currency'])->first();
                $accountCode = $record['currency'] == 'BGN' ? 'RL' : 'RE';
                $account = $accounts->where('code', $accountCode)->first();
                $rate = app('service')->getCurrencyRate($currency, $date);

                $data = [
                    'type'   => $record['type'] == 'Дт' ? -1 : 1,
                    'amount' => $record['amount'],
                    'date'   => $date,
                    'desc'   => $record['desc'],
                    'tax'    => 0,
                    'vat'    => 0,
                ];

                $order = new Order($data);

                $order->rate = $rate;

                $order->currency()->associate($currency);
                $order->account()->associate($account);

                $pies = new Collection();

                //Create Pie
                foreach ($users as $user) {
                    $userPie = new UserPie([
                        'amount' => 0.5,
                    ]);
                    $userPie->user()->associate($user);
                    $userPie->model()->associate($order);
                    $pies->push($userPie);

                }

                $order->pies = $pies;

                $response['orders'][] = app('service')->resource($order, 'currency,account,pies');

            } else {
                $transactions[$record['ref']][] = $record;
            }
        }

        foreach ($transactions as $transaction) {
            $from = $transaction[0];
            $to = $transaction[1];

            $date = date('Y-m-d', strtotime($from['date']));

            $account1Code = $from['currency'] == "EUR" ? 'RE' : "RL";
            $account2Code = $to['currency'] == "EUR" ? 'RE' : "RL";

            $account1 = $accounts->where('code', $account1Code)->first();
            $account2 = $accounts->where('code', $account2Code)->first();

            $currency1 = $currencies->where('name', $from['currency'])->first();
            $currency2 = $currencies->where('name', $to['currency'])->first();

            $data = [
                'amount1' => $from['amount'],
                'amount2' => $to['amount'],
                'date'    => $date,
            ];

            $transaction = new AccountTransaction($data);

            $transaction->account1()->associate($account1);
            $transaction->account2()->associate($account2);
            $transaction->currency1()->associate($currency1);
            $transaction->currency2()->associate($currency2);

            $response['transfers'][] = app('service')->resource($transaction, 'account1,account2,currency1,currency2');
        }

        return response()->json(['data' => $response]);

    }

    public function bankImport(Request $request, OrderService $orderService, AccountTransactionService $accountTransactionService)
    {
        $orders = $request->orders;

        foreach ((array)$orders as $data) {
            $data['pies'][0]['amount'] = $data['pies'][0]['amount'] / 100;
            $data['pies'][1]['amount'] = $data['pies'][1]['amount'] / 100;

            $data['type'] = $data['type'] == 'cost' ? -1 : 1;

            $orderService->create($data);

        }

        $transactions = $request->transfers;

        foreach ((array)$transactions as $data) {

            $accountTransactionService->create($data);

        }

        return $this->noContent();
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
        $order = Order::where('id', $id)->firstOrFail();

        $order->onDelete();

        $order->delete();

        return $this->noContent();
    }
}
