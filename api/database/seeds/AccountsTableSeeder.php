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
                'name' => 'Разплащателна ЛВ',
                'code' => 'RL',
                'meta' => [
                    'bank'  => 'ProCredit Bank',
                    'iban'  => 'BG66PRCB92301042936319',
                    'swift' => 'PRCBBGSF',
                ],
            ],
            [
                'name' => 'Разплащателна Евро',
                'code' => 'RE',
                'meta' => [
                    'bank'  => 'ProCredit Bank',
                    'iban'  => 'BG16PRCB92301442936313',
                    'swift' => 'PRCBBGSF',
                ],
            ],
            [
                'name' => 'Freelancer',
                'code' => 'FRL',
            ],
            [
                'name' => 'PayPal',
                'code' => 'PP',
            ],
            [
                'name' => 'Cash',
                'code' => 'CH',
            ],
        ];

        foreach ($data as $d) {
            \App\Account::create($d);
        }
    }
}
