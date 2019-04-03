<?php

use Illuminate\Database\Seeder;

class CurrenciesTableSeeder extends Seeder
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
                'name' => 'USD',
            ],
            [
                'name' => 'BGN',
            ],
            [
                'name' => 'EUR',
            ],
            [
                'name' => 'CAD',
            ],
            [
                'name' => 'GBP',
            ],
            [
                'name' => 'AUD',
            ],
        ];

        foreach ($data as $d) {
            \App\Currency::create($d);
        }
    }
}
