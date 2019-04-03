<?php

namespace App;

class InvoiceItem extends Model
{

    protected $table = 'invoice_items';
    protected $fillable
        = [
            'descBg',
            'descEn',
            'qty',
            'amount',
        ];
    public $resourcable
        = [
            'descBg',
            'descEn',
            'qty',
            'amount',
        ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

}
