<?php
/**
 * Created by PhpStorm.
 * User: simeo
 * Date: 4/15/2019
 * Time: 2:17 AM
 */

namespace App\Services;


use App\Account;
use App\Client;
use App\Currency;
use App\Invoice;
use App\Project;

class InvoiceService
{

    public $vat = 0.2;
    public $tax = 0.1;
    public static $euCountries = 'AT,BE,DE,GR,DK,EE,IE,ES,IT,CY,LV,LT,LU,MT,NL,GB,PL,PT,RO,SK,SI,HU,FR,CZ,SE';

    public function create($data, $save = true)
    {
        $currency = Currency::where('id', $data['currency'])->firstOrFail();
        $account = Account::where('id', $data['account'])->firstOrFail();
        $project = Project::where('id', $data['project'])->with('client.country')->firstOrFail();


        $invoice = new Invoice($data);

        $meta = [
            'client' => app('service')->resource($project->client, 'country'),
        ];

        if ($data['meta']) {
            $meta += $data['meta'];
        } else {

            if (!$data['rate']) {
                $rate = app('service')->getCurrencyRate($currency, $data['date']);
            } else {
                $rate = $data['rate'];
            }

            $meta += ['rate' => $rate];
            $this->setMetaVat($meta, $data, $project->client->country);
        }


        $invoice->meta = $meta;

        $invoice->currency()->associate($currency);
        $invoice->project()->associate($project);
        $invoice->account()->associate($account);

        if ($save) {
            $invoice->save();
        }

        $invoice->createItems($data['items'], $save);


        return $invoice;
    }

    public function setMetaVat(&$meta, $data, Client $client)
    {
        $euCountries = explode(",", $this->euCountries);
        $country = $client->country;


        if ($country->code == "BG"
            || (in_array($country->code, $euCountries)
                && (!$client->company
                    || !$client->vat))
        ) {
            $vat = $this->vat;
        } else {
            $vat = false;
        }

        $vatReason = false;

        if (in_array($country->code, $euCountries)) {
            if ($data["advance"]) {
                $vatReason = "vat_reason_eu_adv";
            } else {
                if (!$client->company) {
                    $vatReason = "vat_reason_eu_novat";
                } else {
                    if ($client->vat) {
                        $vatReason = "vat_reason_eu_vat";
                    }
                }
            }
        } else {
            if ($country->code != "BG") {
                $vatReason = "vat_reason_outes";
            }
        }

        $meta['vat'] = $vat;
        $meta['vatReason'] = $vatReason;
    }
}