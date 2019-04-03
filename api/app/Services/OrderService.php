<?php
/**
 * Created by PhpStorm.
 * User: simeo
 * Date: 4/3/2019
 * Time: 12:04 AM
 */

namespace App\Services;


use App\Account;
use App\Currency;
use App\Order;

class OrderService
{

    public function create($data)
    {
        $currency = Currency::where('id', $data['currency'])->first();
        $account = Account::where('id', $data['account'])->first();

        if (!$data['rate']) {
            $rate = app('service')->getCurrencyRate($currency, $data['date']);
        } else {
            $rate = $data['rate'];
        }

        $order = new Order($data);

        $order->rate = $rate;

        $order->currency()->associate($currency);
        $order->account()->associate($account);

        $order->save();

        $order->updatePies($data['pies']);
        $order->updateRels($data);

        $order->updateAccounts();
    }

    public function update(Order $order, $data)
    {
        $currency = Currency::where('id', $data['currency'])->first();
        $account = Account::where('id', $data['account'])->first();

        $rate = app('service')->getCurrencyRate($currency, $data['date']);

        $order->update($data);

        $order->rate = $rate;

        $order->currency()->associate($currency);
        $order->account()->associate($account);

        $order->save();

        $order->updatePies($data['pies']);
        $order->updateRels($data);
        
        $order->updateAccounts();
    }
}