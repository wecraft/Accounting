<?php

namespace App\Console\Commands;

use App\Account;
use App\Client;
use App\Country;
use App\Currency;
use App\CurrencyRate;
use App\Order;
use App\Project;
use App\Services\AccountTransactionService;
use App\Services\ClientService;
use App\Services\InvoiceService;
use App\Services\OrderService;
use App\Services\ProjectService;
use App\Services\UserTransactionService;
use App\UserTransaction;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class Migrate extends Command
{

    public $db;

    public $currencies
        = [
            1 => "CAD",
            2 => "USD",
            3 => "BGN",
            4 => "EUR",
            5 => "GBP",
            6 => "AUD",
        ];

    public $accounts
        = [
            1 => "RL",
            2 => "RE",
            3 => "FRL",
            4 => "PP",
            5 => "CH",
        ];

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migration {type}';

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
        $this->db = DB::connection('old');

        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $type = ucfirst($this->argument('type'));

        $method = "handle".$type;

        $this->info("Start: $type");
        $this->$method();
        $this->info("Complete: $type");

        return;

        $data = $this->db->table('orders')->get();

        $data->each(function ($item) {
            $content = json_encode(unserialize($item->data), JSON_UNESCAPED_UNICODE);

            $this->db->table('orders')->where('id', $item->id)->update([
                'data' => $content,
            ]);
        });
    }

    public function handleClients()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('clients')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $data = $this->db->table('wfw_models_meta')->where("type", 'customer')->get();

        $data->each(function ($item) {
            $content = json_decode($item->content);
            $country = Country::where('code', $content->country)->first();

            $data = [
                'name'     => $item->title,
                'eik'      => $content->egn,
                'mol'      => $content->mol,
                'email'    => $content->email,
                'city'     => $content->city,
                'address'  => $content->address,
                'postCode' => $content->code,
                'company'  => $content->legal_form == 'ul' ? 1 : 0,
                'vat'      => $content->reg_vat == 'yes' ? 1 : 0,
                'country'  => $country->id,
                'modelId'  => $item->model,
            ];

            (new ClientService)->create($data);
        });
    }

    public function handleProjects()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('projects')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $data = $this->db->table('wfw_models_meta')->where("type", 'project')
            ->where('name', 'info')
            ->get();

        $data->each(function ($item) {
            $content = json_decode($item->content);
            $currency = Currency::where('name', $this->currencies[$content->currency])->first();
            $client = Client::where('model_id', $content->customer)->first();

            $data = [
                'name'     => $item->title,
                'price'    => $content->price,
                'status'   => $content->status ?: 'progress',
                'client'   => $client->id,
                'currency' => $currency->id,
                'pies'     => [
                    [
                        'userId' => 1,
                        'amount' => $content->team_rates->{1} ?: .5,
                    ],
                    [
                        'userId' => 2,
                        'amount' => $content->team_rates->{2} ?: .5,
                    ],
                ],
                'modelId'  => $item->model,
            ];

            (new ProjectService)->create($data);
        });
    }

    public function handleOrders()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('orders')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $data = $this->db->table('orders')
            ->where('code', '<', 300)
            ->get();

        $bar = $this->output->createProgressBar($data->count());

        $bar->start();


        $data->each(function ($item) use ($bar) {
            $content = json_decode($item->data);
            $desc = $content->subject;

            $date = $item->date;

            $currency = Currency::where('name', $this->currencies[$item->currency])->first();

            $checkRate = CurrencyRate::where("currency_id", $currency->id)->date($date)->first();

            $account = Account::where('code', $this->accounts[$item->account])->first();

            $crate = $item->crate ?: 1;

            if (!$checkRate) {
                $rate = new CurrencyRate([
                    'rate' => $crate,
                ]);

                $rate->currency()->associate($currency);
                $rate->created_at = date("Y-m-d H:i:s", strtotime($date));

                $rate->save();
            }

            $data = [
                'amount'   => abs($item->amount),
                'type'     => $item->amount > 0 ? 1 : -1,
                'rate'     => $crate,
                'date'     => $date,
                'desc'     => $desc,
                'tax'      => $item->tax ? 1 : 0,
                'vat'      => $item->vat ? 1 : 0,
                'projects' => [$item->project_id],
                'account'  => $account->id,
                'currency' => $currency->id,
                'pies'     => [
                    [
                        'userId' => 1,
                        'amount' => $item->team_1_rate,
                    ],
                    [
                        'userId' => 2,
                        'amount' => $item->team_2_rate,
                    ],
                ],
                'modelId'  => $item->id,
            ];

            $order = (new OrderService)->create($data);

            //Attachments
            $files = explode(",", $item->files);
            foreach ($files as $file) {
                $fileSrc = storage_path('orders/'.$file);
                if (is_file($fileSrc) && is_readable($fileSrc)) {
                    $order->attachFile('orders/'.$file);

                }
            }

            $bar->advance();
        });

        $bar->finish();
    }

    public function handleAccountTransactions()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('account_transactions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $data = $this->db->table('orders')
            ->where('code', 301)
            ->get();

        $bar = $this->output->createProgressBar($data->count());

        $bar->start();


        $data->each(function ($item) use ($bar) {

            $date = $item->date;

            $currency1 = Currency::where('name', $this->currencies[$item->currency])->first();
            $currency2 = Currency::where('name', $this->currencies[$item->currency2])->first();


            $account1 = Account::where('code', $this->accounts[$item->account])->first();
            $account2 = Account::where('code', $this->accounts[$item->account2])->first();

            $data = [
                'amount1'   => abs($item->amount),
                'amount2'   => abs($item->amount2),
                'date'      => $date,
                'account1'  => $account1->id,
                'account2'  => $account2->id,
                'currency1' => $currency1->id,
                'currency2' => $currency2->id,
                'modelId'   => $item->id,
            ];

            (new AccountTransactionService)->create($data);

            $bar->advance();
        });

        $bar->finish();
    }

    public function handleUserTransactions()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('user_transactions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $data = $this->db->table('orders')
            ->where('code', 401)
            ->get();

        $bar = $this->output->createProgressBar($data->count());

        $bar->start();


        $data->each(function ($item) use ($bar) {
            $content = json_decode($item->data);
            $desc = $content->subject;

            $currency = Currency::where('name', $this->currencies[$item->currency])->first();

            $user1 = $item->team_1_rate == -1 ? 1 : 2;
            $user2 = $item->team_1_rate == -1 ? 2 : 1;

            $data = [
                'amount'   => abs($item->amount),
                'desc'     => $desc,
                'user1'    => $user1,
                'user2'    => $user2,
                'currency' => $currency->id,
                'modelId'  => $item->id,
            ];

            (new UserTransactionService)->create($data);

            $bar->advance();
        });

        $bar->finish();
    }

    public function handleStat()
    {
        $data = DB::table('user_parts')->selectRaw('SUM(amount * type) as amount, user_id, currency_id')->groupBy('currency_id', 'user_id')->get();

        $users = [];

        echo "<pre>".print_r($data, true)."</pre>";

        $data->each(function ($item) use (&$users) {
            $rate = app('service')->getCurrencyRate($item->currency_id);
            $amount = $item->amount * $rate;
            $users[$item->user_id] = $users[$item->user_id] + $amount;
        });

        $this->info("Users:");

        echo "<pre>".print_r($users, true)."</pre>";


        $data = DB::table('account_parts')->selectRaw('SUM(amount * type) as amount, account_id, currency_id')->groupBy('currency_id', 'account_id')->get();

        echo "<pre>".print_r($data, true)."</pre>";

        $users = [];

        $data->each(function ($item) use (&$users) {
            $rate = app('service')->getCurrencyRate($item->currency_id);
            $amount = $item->amount * $rate;
            $users[$item->account_id] = $users[$item->account_id] + $amount;
        });

        $this->info("Accounts:");

        echo "<pre>".print_r($users, true)."</pre>";


        $data = DB::table('orders')->selectRaw('SUM(amount * type) as amount, currency_id')->where('currency_id', '<>', 6)->groupBy('currency_id')->get();

        $sum = 0;

        $data->each(function ($item) use (&$sum) {
            $rate = app('service')->getCurrencyRate($item->currency_id);
            $amount = $item->amount * $rate;
            $sum += $amount;
        });

        $this->info("Orders:");

        echo "<pre>".print_r($sum, true)."</pre>";
    }

    public function handleOrderProjects()
    {
        $data = $this->db->table('orders')
            ->where('code', '<', 300)
            ->get();


        $data->each(function ($item) {
            $order = Order::where("model_id", $item->id)->first();
            $project = Project::where('model_id', $item->project_id)->first();

            if ($order) {
                $order->projects()->detach();
                if ($project) {
                    $this->line("Order: {$order->id} -- Project: {$project->id}");
                    $order->projects()->attach($project->id);
                }
            }
        });
    }

    public function handleModelDates()
    {
        $userTrans = UserTransaction::all();

        $userTrans->each(function ($item) {
            $model = $this->db->table('orders')
                ->where('id', $item->model_id)
                ->first();

            $item->created_at = $model->date;
            $item->save();
        });

        $projects = Project::all();
        $projects->each(function ($item) {
            $model = $this->db->table('wfw_models')
                ->where('id', $item->model_id)
                ->first();

            $item->created_at = $model->date;
            $item->save();
        });

        $clients = Client::all();
        $clients->each(function ($item) {
            $model = $this->db->table('wfw_models')
                ->where('id', $item->model_id)
                ->first();

            $item->created_at = $model->date;
            $item->save();
        });
    }

    //    public function handleFix()
    //    {
    //        $data = $this->db->table('wfw_models_meta')->where("type", 'invoice')
    //            ->whereIn('name', ['payment', 'invoice_date', 'proform'])
    //            ->get();
    //
    //        $data->each(function ($item) {
    //            $orig = $this->db->table('wfw_models_meta_2')->where('id', $item->id)->first();
    //
    //            $this->db->table('wfw_models_meta')->where('id', $item->id)->update([
    //                'content' => $orig->content,
    //            ]);
    //        });
    //    }

    public function handleInvoices()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('invoices')->truncate();
        DB::table('invoice_items')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $data = $this->db->table('wfw_models_meta')->where("type", 'invoice')
            ->where('name', 'data')
            ->get();

        $data->each(function ($item) {
            $content = json_decode($item->content);
            $payment = $this->db->table('wfw_models_meta')->where("type", 'invoice')
                ->where("name", "payment")
                ->where('model', $item->model)
                ->first()->content;
            $currency = Currency::where('name', $this->currencies[$content->currency])->first();
            $account = Account::where('id', $content->account)->first();
            $project = Project::where('model_id', $content->project)->with('client.country')->first();

            $items = [];
            foreach ((array)$content->items as $it) {
                if ($it->amount > 0) {
                    $items[] = [
                        'descBg' => $it->description->bg,
                        'descEn' => $it->description->en,
                        'qty'    => $it->qty,
                        'amount' => $it->amount,
                    ];
                }
            }

            $data = [
                'prefix'     => $content->invoice_owner_id == 2 ? 1 : 2,
                'lang'       => $project->client->country->code == 'BG' ? 'bg' : 'en',
                'number'     => $content->invoice_number_n,
                'currency'   => $currency->id,
                'account'    => $account->id,
                'project'    => $project->id,
                'advance'    => $content->advance ? 1 : 0,
                'proforma'   => $content->proform ? 1 : 0,
                'issueDate'  => Carbon::createFromFormat('d.m.Y', $content->date)->format('Y-m-d'),
                'pmtDate'    => $payment,
                'advPmtDate' => $content->advance_date ? Carbon::createFromFormat('d.m.Y', $content->advance_date)->format('Y-m-d') : null,
                'modelId'    => $item->model,
                'items'      => $items,
                'meta'       => [
                    'rate'      => $content->crate,
                    'vat'       => $content->vat,
                    'vatReason' => $content->vat_reason,
                ],
            ];

            (new InvoiceService)->create($data);

        });
    }
}
