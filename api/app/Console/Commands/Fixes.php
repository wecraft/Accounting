<?php

namespace App\Console\Commands;

use App\AccountTransaction;
use App\UserPart;
use Illuminate\Console\Command;

class Fixes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix {type}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $method = 'handle'.ucfirst($this->argument('type'));

        $this->$method();
    }

    /**
     * Fix user parts and account transactions rates
     */
    public function handleUserParts()
    {
        $data = UserPart::where("operation_type", AccountTransaction::class)->get();

        $data->each(function ($item) {
            $rate = app('service')->getCurrencyRate($item->currency_id, $item->date);
            $item->rate = $rate;
            $item->save();
        });
    }
}
