<?php

use Illuminate\Database\Seeder;

class AccountsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'name'        => 'Разпл. ЛВ',
                'code'        => 'RL',
                'meta'        => [
                    'bank'  => 'ProCredit Bank',
                    'iban'  => 'BG66PRCB92301042936319',
                    'swift' => 'PRCBBGSF',
                ],
                'currency_id' => 2,
            ],
            [
                'name'        => 'Разпл. Евро',
                'code'        => 'RE',
                'meta'        => [
                    'bank'  => 'ProCredit Bank',
                    'iban'  => 'BG16PRCB92301442936313',
                    'swift' => 'PRCBBGSF',
                ],
                'currency_id' => 3,
            ],
            [
                'name'        => 'Freelancer',
                'code'        => 'FRL',
                'currency_id' => 1,
            ],
            [
                'name'        => 'PayPal',
                'code'        => 'PP',
                'currency_id' => 1,
            ],
            [
                'name'        => 'Cash',
                'code'        => 'CH',
                'currency_id' => 2,
            ],
        ];

        foreach ($data as $d) {
            $acc = new \App\Account($d);
            $acc->currency_id = $d['currency_id'];
            $acc->save();
        }
    }
}
