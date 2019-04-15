<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>
    <title>{{$title}}</title>
    <style type="text/css">
        body {
            color: #333;
            margin: 0;
            padding: 0;
            font-size: 11pt;
            font-family: Calibri;
        }

        table {
            margin: 0;
            border-collapse: collapse;
        }

        table td {
            padding: 2.5mm 3mm;
        }

        .w-100 {
            width: 100%;
        }

        .al-r {
            text-align: right;
        }

        .al-c {
            text-align: center;
        }

        .va-t {
            vertical-align: top;
        }

        p {
            padding: 5mm
        }
    </style>
</head>
<body>
<table style="width: 172mm">
    <tr>
        <td style="padding: 0; width: 86mm"><img src="{{asset('img/logo.png')}}" style="width: 43mm"/></td>
        <td style="width: 86mm; padding: 0; padding-top: 1mm;" class="va-t">
            <table style="width: 86mm;">
                <tr>
                    <td>{{__('messages.invoice_number', [], $lang)}}:</td>
                    <td class="al-r">{{$invoice->invoiceNumber}}</td>
                </tr>
                <tr>
                    <td>{{__('messages.date_created', [], $lang)}}:</td>
                    <td class="al-r"><?= date("Y-m-d", strtotime($invoice->issueDate)) ?></td>
                </tr>
                <tr style="background: #eaeaea">
                    <td>{{__('messages.total_amount', [], $lang)}}:</td>
                    <td class="al-r">{{$total}} {{$invoice->currency->name}}</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="al-c" style="padding-top: 4mm">
            <b style="font-size: 19pt">{{__('messages.invoice', [], $lang)}}</b>

            @if($lang == 'bg' || $invoice->proforma)
                <br/><span
                        style="color: #848484">{{!$invoice->proforma ? $type == 'original' ? __('messages.original', [], $lang) : __('messages.copy', [], $lang) : __('messages.proform', [], $lang) }}</span>
            @endif
        </td>
    </tr>
    <tr>
        <td colspan="2" style="height: 199mm; vertical-align: middle; padding: 0">
            <table style="width: 172mm">
                <tr>
                    <td style="padding: 0; width: 86mm; font-weight: bold; font-size: 14pt;">{{__('messages.provider', [], $lang)}}</td>
                    <td style="padding: 0; padding-left: 3mm; width: 86mm; font-weight: bold; font-size: 14pt;">{{__('messages.recipient', [], $lang)}}</td>
                </tr>
                <tr>
                    <td style="color: #848484; padding: 2.5mm 0 8mm 0" class="va-t">
                        {!! __('messages.my_address', [
                            'name' => $user->name
                        ], $lang) !!}

                    </td>
                    <td style="color: #848484; padding: 2.5mm 3mm 8mm 3mm" class="va-t">
                        {{$invoice->meta['client']['name']}}<br/>
                        {{$invoice->meta['client']['address']}}<br/>
                        {{$invoice->meta['client']['postCode']}} {{$invoice->meta['client']['city']}}
                        , {{$invoice->meta['client']['country']['name']}}<br/>
                        {{$invoice->meta['client']['mol']}}<br/>
                        {{$invoice->meta['client']['email']}}<br/>
                        {{$invoice->meta['client']['company'] ? __('messages.eik', [], $lang) : __('messages.egn', [], $lang)}}
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding: 0">
                        <table style="width: 172mm">
                            <tr style="background: #eaeaea;">
                                <td style="width: 1mm">#</td>
                                <td>{{__('messages.description', [], $lang)}}</td>
                                <td style="width: 1mm">{{__('messages.unit', [], $lang)}}</td>
                                <td style="width: 1mm">{!! __('messages.unit_price', [], $lang) !!}</td>
                                <td style="width: 1mm">{{__('messages.amount', [], $lang)}}</td>
                            </tr>
                            <?php
                            $i = 1;
                            foreach ($invoice->items as $item) {
                            if ($item->amount) {
                            $amount = $invoice->meta['vat'] ? $item->amount / (1 + $invoice->meta['vat'])
                                : $item->amount;
                            $desc = $lang == 'bg' ? $item->desc_bg : $item->desc_en;
                            ?>
                            <tr>
                                <td style="border-bottom: 1px solid #eaeaea"><?= $i ?></td>
                                <td style="border-bottom: 1px solid #eaeaea"><?= $desc?></td>
                                <td style="border-bottom: 1px solid #eaeaea; text-align: right"><?= $item->qty ?></td>
                                <td style="border-bottom: 1px solid #eaeaea"><?= number_format($amount, 2) ?>
                                    &nbsp;<?= $invoice->currency->name; ?></td>
                                <td style="border-bottom: 1px solid #eaeaea"><?= number_format($amount * $item->qty,
                                        2) ?>&nbsp;<?= $invoice->currency->name; ?></td>
                            </tr>
                            <?php
                            $i++;
                            }
                            }
                            ?>
                        </table>

                    </td>
                </tr>
                <tr>
                    <td style="padding: 0; padding-top: 7mm" class="va-t">
                        <table style="width: 86mm">
                            <tr>
                                <td style="padding: 0; width: 86mm; font-weight: bold; font-size: 14pt;">{{__('messages.notes', [], $lang)}}</td>
                            </tr>
                            @if($invoice->meta['vatReason'])
                                <tr>
                                    <td style="padding: 2.5mm 3mm 2.5mm 0; color: #848484">{{__('messages.' . $invoice->meta['vatReason'], [], $lang)}}</td>
                                </tr>
                            @endif
                            <tr>
                                <td style="padding: 0 3mm 0 0">
                                    @if($lang == 'bg' && !$invoice->proforma)
                                        {{__('messages.date_event', [], $lang)}}
                                        : {{date('Y-m-d', strtotime($invoice->issueDate))}}<br/>

                                        @if($invoice->advance)
                                            {{__('messages.date_adv_payment', [], $lang)}}
                                            : {{date('Y-m-d', strtotime($invoice->adv_date))}}<br/>
                                        @endif
                                    @endif

                                    <span style="color: #848484">{{__('messages.payment', [], $lang)}}<br/>
												{{$invoice->account->meta['bank']}}<br/>
                                                IBAN: {{$invoice->account->meta['iban']}}<br/>
												SWIFT: {{$invoice->account->meta['swift']}}
                                            </span>
                                </td>
                            </tr>
                        </table>

                    </td>
                    <td style="width: 86mm; padding: 0; padding-top: 7mm;" class="va-t">
                        <table style="width: 86mm;">
                            <tr>
                                <td>{{__('messages.subtotal', [], $lang)}}:</td>
                                <td class="al-r">{{number_format($subtotal, 2)}} {{$bottom_currency->name}}</td>
                            </tr>

                            @if(!(in_array($invoice->meta['client']['country']['code'], explode(',', \App\Services\InvoiceService::$euCountries))
                                && ($invoice->advance || $invoice->meta['client']['company'])))

                                <tr>
                                    <td>{{__('messages.vat_rate', [], $lang)}}:</td>
                                    <td class="al-r">{{$vat_rate}}%</td>
                                </tr>
                            @endif
                            <tr>
                                <td>{{__('messages.vat_amount', [], $lang)}}:</td>
                                <td class="al-r">{{number_format($vat_amount)}} {{$bottom_currency->name}}</td>
                            </tr>
                            <tr style="background: #eaeaea">
                                <td>{{__('messages.total_amount_bottom', [], $lang)}}:</td>
                                <td class="al-r">{{number_format($bottom_total, 2)}} {{$bottom_currency->name}}</td>
                            </tr>
                            <tr>
                                <td style="color: #848484">{{__('messages.currency', [], $lang)}}
                                    : {{$invoice->currency->name}}</td>

                                @if($invoice->currency->name != 'BGN' && $lang == 'bg')
                                    <td class="al-r" style="color: #848484">{{__('messages.rate', [], $lang)}}
                                        : {{$invoice->meta['rate']}}</td>
                                @endif


                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

        </td>
    </tr>
    @if($lang == 'bg')
        <tr>
            <td style="padding: 0; width: 86mm; color: #848484">{{__('messages.provider', [], $lang)}}:</td>
            <td style="color: #848484">{{__('messages.recipient', [], $lang)}}:</td>
        </tr>
    @endif
</table>
</body>
</html>