<?php
/**
 * Created by PhpStorm.
 * User: simeo
 * Date: 4/3/2019
 * Time: 4:57 AM
 */

namespace App\Services;


use App\Currency;
use App\User;
use App\UserTransaction;

class UserTransactionService
{
    public function create($data)
    {
        $user1 = User::where("id", $data['user1'])->first();
        $user2 = User::where("id", $data['user2'])->first();
        $currency = Currency::where("id", $data['currency'])->first();

        $transaction = new UserTransaction($data);

        $transaction->user1()->associate($user1);
        $transaction->user2()->associate($user2);
        $transaction->currency()->associate($currency);

        $transaction->save();

        $transaction->updateUsers();

        return $transaction;
    }

    public function update(UserTransaction $transaction, $data)
    {
        $user1 = User::where("id", $data['user1'])->first();
        $user2 = User::where("id", $data['user2'])->first();
        $currency = Currency::where("id", $data['currency'])->first();

        $transaction->update($data);

        $transaction->user1()->associate($user1);
        $transaction->user2()->associate($user2);
        $transaction->currency()->associate($currency);

        $transaction->save();

        $transaction->updateUsers();
    }
}