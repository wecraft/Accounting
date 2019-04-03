<?php

namespace App;

class Invoice extends Model
{

    protected $table = 'invoices';
    protected $fillable
        = [
            'prefix',
            'lang',
            'number',
            'meta',
            'advance',
            'proforma',
            'issueDate',
            'pmtDate',
            'advPmtDate',
        ];
    public $resourcable
        = [
            'prefix',
            'lang',
            'number',
            'meta',
            'advance',
            'proforma',
            'issueDate',
            'pmtDate',
            'advPmtDate',
        ];

    public $casts
        = [
            'meta' => 'array',
        ];

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function orders()
    {
        return $this->morphToMany(Order::class, 'orderable');
    }


}
