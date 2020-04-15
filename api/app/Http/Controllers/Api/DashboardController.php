<?php

namespace App\Http\Controllers\Api;

use App\Currency;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $currencies = Currency::all();

        //User parts
        $data = DB::table('user_parts')->selectRaw('SUM(amount * type) as amount, user_id, currency_id')
            ->groupBy('currency_id', 'user_id')->get();

        $users = [];

        $data->each(function ($item) use (&$users) {
            $id = (int)$item->user_id;
            $rate = app('service')->getCurrencyRate($item->currency_id);
            $amount = $item->amount * $rate;
            $users[$id]['amount'] = round($users[$id]['amount'] + $amount, 2);
        });

        //Vat and Tax
        $data = DB::table('user_parts')
            ->selectRaw('SUM(amount * type * tax * rate) as tax, SUM(amount * type * vat * rate) as vat, user_id, currency_id, YEAR(date) as year')
            ->whereRaw('YEAR(date) >= ?', [date('Y') - 1])
            ->groupBy('currency_id', 'user_id', 'year')->get();

        $data->each(function ($item) use (&$users) {
            $id = (int)$item->user_id;
            $vat = $item->vat * .2;
            $tax = $item->tax * .1;
            $users[$id]['vat'][$item->year] = round($users[$id]['vat'][$item->year] + $vat, 2);
            $users[$id]['tax'][$item->year] = round($users[$id]['tax'][$item->year] + $tax, 2);
        });


        $data = DB::table('account_parts')->selectRaw('SUM(amount * type) as amount, account_id, currency_id')->groupBy('currency_id', 'account_id')->get();
        

        $accounts = [];
        $total = 0;

        $data->each(function ($item) use (&$accounts, &$total, $currencies) {
            if ($item->amount <= 0) {
                return;
            }
            $rate = app('service')->getCurrencyRate($item->currency_id);
            $accounts[$item->account_id][] = [
                'amount'   => $item->amount,
                'currency' => $currencies->where('id', $item->currency_id)->first()->name,
            ];
            $total += $item->amount * $rate;
        });

        return response()->json([
            'users'    => $users,
            'accounts' => $accounts,
            'total'    => round($total, 2),
        ]);
    }

    public function stat(Request $request)
    {
        $type = $request->get('type', 'monthly');
        $method = "{$type}Stat";

        list($labels, $incomes, $costs, $profit, $summaryIncomes, $summaryCosts) = $this->$method();

        $data = [
            'labels'   => $labels,
            'datasets' => [
                [
                    'label'           => 'Income',
                    'data'            => $incomes,
                    'backgroundColor' => "rgba(24, 186, 80, 0.2)",
                    'borderColor'     => "rgba(24, 186, 80, 1)",
                    'borderWidth'     => 1,
                ],
                [
                    'label'           => 'Cost',
                    'data'            => $costs,
                    'backgroundColor' => "rgba(255, 99, 132, 0.2)",
                    'borderColor'     => "rgba(255, 99, 132, 1)",
                    'borderWidth'     => 1,
                ],
                [
                    'label'           => 'Profit',
                    'data'            => $profit,
                    'backgroundColor' => "rgba(54, 162, 235, 0.2)",
                    'borderColor'     => "rgba(54, 162, 235, 1)",
                    'borderWidth'     => 1,
                    'type'            => 'line',
                ],
            ],
        ];

        return response()->json([
            'data'    => $data,
            'summary' => [
                'income' => $summaryIncomes,
                'cost'   => $summaryCosts,
                'profit' => $summaryIncomes - $summaryCosts,
            ],
        ]);

    }

    private function monthlyStat()
    {
        $dataset = DB::table('orders')
            ->selectRaw("SUM(IF(type > 0, amount * rate, 0)) AS income, SUM(IF(type < 0, amount * rate, 0)) AS cost, CONCAT_WS('.', MONTH(date), YEAR(date)) as month")
            ->whereRaw('date > DATE_SUB(NOW(), INTERVAL 12 MONTH)')
            ->where('account_id', '<>', 5)
            ->groupBy('month')
            ->orderBy('date', 'desc')
            ->get();

        $months = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Noe", "Dec"];

        $labels = [];
        $incomes = [];
        $costs = [];
        $profit = [];
        $summaryCosts = 0;
        $summaryIncomes = 0;

        foreach ($dataset as $item) {
            $exp = explode('.', $item->month);
            $labels[] = "{$months[$exp[0] - 1]} {$exp[1]}";
            $incomes[] = round($item->income);
            $costs[] = round($item->cost);
            $profit[] = round($item->income - $item->cost);
            $summaryIncomes += round($item->income);
            $summaryCosts += round($item->cost);
        }


        return [$labels, $incomes, $costs, $profit, $summaryIncomes, $summaryCosts];
    }

    private function annualStat()
    {
        $dataset = DB::table('orders')
            ->selectRaw("SUM(IF(type > 0, amount * rate, 0)) AS income, SUM(IF(type < 0, amount * rate, 0)) AS cost, YEAR(date) as year")
            //            ->whereRaw('date > DATE_SUB(NOW(), INTERVAL 12 MONTH)')
            ->where('account_id', '<>', 5)
            ->groupBy('year')
            ->orderBy('date', 'desc')
            ->get();


        $labels = [];
        $incomes = [];
        $costs = [];
        $profit = [];
        $summaryCosts = 0;
        $summaryIncomes = 0;

        foreach ($dataset as $item) {
            $labels[] = $item->year;
            $incomes[] = round($item->income);
            $costs[] = round($item->cost);
            $profit[] = round($item->income - $item->cost);
            $summaryIncomes += round($item->income);
            $summaryCosts += round($item->cost);
        }


        return [$labels, $incomes, $costs, $profit, $summaryIncomes, $summaryCosts];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
