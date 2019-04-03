<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AccountsTableSeeder::class);
        $this->call(CountriesTableSeeder::class);
        $this->call(CurrenciesTableSeeder::class);

        //Migrations
        \Illuminate\Support\Facades\Artisan::call('create:user', [
            'email'     => 'alex@wecraftmedia.com',
            'firstName' => 'Alex',
            'lastName'  => 'Dimov',
            'password'  => 'qwerty12',
            'role'      => 'admin',
        ]);
        \Illuminate\Support\Facades\Artisan::call('create:user', [
            'email'     => 'valentin@wecraftmedia.com',
            'firstName' => 'Valentin',
            'lastName'  => 'Simeonov',
            'password'  => 'qwerty12',
            'role'      => 'admin',
        ]);
        //Migrations
        \Illuminate\Support\Facades\Artisan::call('migration', [
            'type' => 'clients',
        ]);
        \Illuminate\Support\Facades\Artisan::call('migration', [
            'type' => 'projects',
        ]);
        //        \Illuminate\Support\Facades\Artisan::call('migration', [
        //            'type' => 'orders',
        //        ]);
        \Illuminate\Support\Facades\Artisan::call('migration', [
            'type' => 'accountTransactions',
        ]);
        \Illuminate\Support\Facades\Artisan::call('migration', [
            'type' => 'userTransactions',
        ]);
    }
}