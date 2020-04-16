<?php

namespace App\Console\Commands;

use App\AccountTransaction;
use App\Order;
use App\UserPart;
use App\UserPie;
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

    public function handleIncomeTaxes()
    {
        $orders = Order::where('type', 1)->where('tax', 0)->where('account_id', '<=', 2)->with('pies')->get();

        $orders->each(function (Order $order) {
            $pies = [];
            $order->pies->each(function (UserPie $pie) use (&$pies) {
                $pies[] = [
                    'userId' => $pie->user_id,
                    'amount' => $pie->amount * 100,
                ];
            });

            $order->tax = 1;
            $order->save();

            $order->updatePies($pies);

        });
    }

    public function handleMissingTaxes()
    {
        $ids = [];
        $orders = Order::where('tax', 2)->get();

        $orders->each(function (Order $order) {
            $pies = [];
            $order->pies->each(function (UserPie $pie) use (&$pies) {
                $pies[] = [
                    'userId' => $pie->user_id,
                    'amount' => $pie->amount,
                ];
            });

            $order->tax = 1;
            $order->save();

            $order->updatePies($pies);

        });
    }
}
