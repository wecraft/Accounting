<?php
/**
 * Created by PhpStorm.
 * User: simeo
 * Date: 4/3/2019
 * Time: 4:57 AM
 */

namespace App\Services;


use App\Account;
use App\AccountTransaction;
use App\Currency;

class AccountTransactionService
{
    public function create($data)
    {
        $account1 = Account::where('id', $data['account1'])->first();
        $account2 = Account::where('id', $data['account2'])->first();

        $currency1 = Currency::where('id', $data['currency1'])->first();
        $currency2 = Currency::where('id', $data['currency2'])->first();

        $transaction = new AccountTransaction($data);

        $transaction->account1()->associate($account1);
        $transaction->account2()->associate($account2);
        $transaction->currency1()->associate($currency1);
        $transaction->currency2()->associate($currency2);

        $transaction->save();

        $transaction->updateAccounts();
        $transaction->updateUsers();

        return $transaction;
    }

    public function update(AccountTransaction $transaction, $data)
    {
        $account1 = Account::where('id', $data['account1'])->first();
        $account2 = Account::where('id', $data['account2'])->first();

        $currency1 = Currency::where('id', $data['currency1'])->first();
        $currency2 = Currency::where('id', $data['currency2'])->first();

        $transaction->update($data);

        $transaction->account1()->associate($account1);
        $transaction->account2()->associate($account2);
        $transaction->currency1()->associate($currency1);
        $transaction->currency2()->associate($currency2);

        $transaction->save();

        $transaction->updateAccounts();
        $transaction->updateUsers();
    }
}
