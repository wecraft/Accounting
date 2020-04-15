<?php

namespace App\Http\Controllers\Api;

use App\Currency;
use App\Http\Controllers\Controller;
use App\Http\Resources\Resource;
use App\Invoice;
use App\Services\InvoiceService;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use PDF;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $chunk = min($request->get('chunk', 100), 500);

        $data = Invoice::orderBy('issue_date', 'desc')->orderBy('number', 'desc')->simplePaginate($chunk);

        return Resource::collection($data, $request->include);
    }

    public function count()
    {

        $count = Invoice::count();

        return response()->json(['data' => $count]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, InvoiceService $invoiceService)
    {
        $data = $request->all();

        $action = $data['action'];


        if ($action == 'save') {
            $invoice = $invoiceService->create($data);

            return new Resource($invoice, $request->include);
        } else {
            $invoice = $invoiceService->create($data, false);

            return $this->genPdf($invoice, $action);
        }
    }

    public function copy($id, Request $request, InvoiceService $invoiceService)
    {
        $parent = Invoice::where('id', $id)->with('items')->firstOrFail();

        $parent = $parent->toArray();

        $items = [];

        foreach ((array)$parent['items'] as $item) {
            $items[] = [
                'descBg' => $item['desc_bg'],
                'descEn' => $item['desc_en'],
                'amount' => $item['amount'],
                'qty'    => $item['qty'],
            ];
        }

        $data = [
            'advance'   => $parent['advance'],
            'proforma'  => $request->proforma ? 1 : 0,
            'issueDate' => Carbon::now()->format('Y-m-d'),
            'currency'  => $parent['currency_id'],
            'project'   => $parent['project_id'],
            'account'   => $parent['account_id'],
            'items'     => $items,
        ];

        $invoice = $invoiceService->create($data);

        return new Resource($invoice, 'currency,project,account,items');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $responseType = $request->get("responseType", "data");

        $invoice = Invoice::where('id', $id)->firstOrFail();

        if ($responseType == 'data') {
            return new Resource($invoice, $request->include);
        } else {
            return $this->genPdf($invoice, $responseType);
        }
    }

    private function genPdf($invoice, $type)
    {
        $invoice->load(['currency', 'account']);

        $lang = $type == 'copy' ? 'bg' : $invoice->lang;

        $total = 0;
        $invoice->items->each(function ($item) use (&$total) {
            $total += $item->amount * $item->qty;
        });

        if ($lang == "bg" && $invoice->currency->name != 'BGN') {
            $bottom_total = $total * $invoice->meta['rate'];
            $bottom_currency = Currency::where('name', 'BGN')->first();
        } else {
            $bottom_total = $total;
            $bottom_currency = $invoice->currency;
        }

        $subtotal = $bottom_total;

        if ($invoice->meta['vat']) {
            $subtotal = $bottom_total / (1 + $invoice->meta['vat']);
            $vat_rate = $invoice->meta['vat'] * 100;
            $vat_amount = $subtotal * $invoice->meta['vat'];
        } else {
            $vat_rate = $vat_amount = 0;
        }

        $user = User::where('id', $invoice->prefix)->first();

        $data = [
            'invoice'         => $invoice,
            'type'            => $type,
            'lang'            => $lang,
            'user'            => $user,
            'subtotal'        => $subtotal,
            'total'           => round($total, 2),
            'bottom_total'    => $bottom_total,
            'bottom_currency' => $bottom_currency,
            'vat_rate'        => $vat_rate,
            'vat_amount'      => $vat_amount,
            'title'           => !$invoice->id ? "New Invoice" : "Invoice - #".$invoice->invoiceNumber,
        ];

        //        return view('invoice', $data);


        $pdf = PDF::loadView('invoice', $data);

        return $pdf->stream();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InvoiceService $invoiceService, $id)
    {
        $invoice = Invoice::where('id', $id)->firstOrFail();

        $data = $request->all();

        $invoiceService->update($invoice, $data);

        return new Resource($invoice, $request->include);
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
        $invoice = Invoice::where('id', $id)->firstOrFail();

        $invoice->delete();
    }
}
