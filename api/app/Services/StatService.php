<?php


namespace App\Services;


use App\Invoice;
use App\InvoiceItem;
use App\Order;
use App\UserPie;

class StatService
{
    public function getYearlyTaxes($year)
    {
        $result = [
            1 => 0,
            2 => 0,
        ];

        // Get incomes
        $invoices = Invoice::whereRaw('year(issue_date) = ?', [$year])
            ->where('proforma', 0)->with(['items', 'project.pies'])->get();

        $invoices->each(function (Invoice $invoice) use (&$result) {
            $amount = $invoice->items->sum(function (InvoiceItem $item) {
                return $item->amount * $item->qty;
            });

            $vat = 1 + $invoice->meta['vat'];

            $amount = ($amount * $invoice->meta['rate']) / $vat;

            $invoice->project->pies->each(function (UserPie $pie) use (&$result, $amount) {
                $userId = $pie->user_id;
                $sum = $amount * $pie->amount;
                $result[$userId] = $result[$userId] + $sum;
            });
        });

        // Get costs
        $orders = Order::whereRaw('year(date) = ?', [$year])
            ->where("tax", 1)
            ->where('type', -1)
            ->with('pies')
            ->get();

        $orders->each(function (Order $order) use (&$result) {
            $amount = $order->amount * $order->rate * $order->type;

            $vat = 1 + ($order->vat * 0.2);

            $amount = $amount / $vat;

            $order->pies->each(function (UserPie $pie) use (&$result, $amount) {
                $userId = $pie->user_id;
                $sum = $amount * $pie->amount;
                $result[$userId] = $result[$userId] + $sum;
            });
        });


        $amount = $result[1] + $result[2];

        $result = [
            1 => round(($result[1] / $amount) * 100, 2),
            2 => round(($result[2] / $amount) * 100, 2),
        ];

        return $result;
    }
}