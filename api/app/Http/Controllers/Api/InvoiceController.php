<?php

namespace App\Http\Controllers\Api;

use App\Currency;
use App\Http\Controllers\Controller;
use App\Http\Resources\Resource;
use App\Invoice;
use App\User;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = Invoice::orderBy('created_at', 'desc')->get();

        return Resource::collection($data, $request->include);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
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
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $responseType = $request->get("response_type", "data");

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

        return view('invoice', $data);

        //        $pdf = PDF::loadView('myPDF', ['invoice' => $invoice]);

        //        return $pdf->download('itsolutionstuff.pdf');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int                      $id
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
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
