<?php

namespace App;


use Illuminate\Database\Eloquent\Collection;

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
            'modelId',
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

    public $includes = ['project', 'account', 'currency'];

    public function getInvoiceNumberAttribute()
    {
        if (!$this->proforma) {
            return 1000000000 * $this->prefix + $this->number;

        } else {
            return str_pad($this->number, 10, "0", STR_PAD_LEFT);
        }
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function orders()
    {
        return $this->morphToMany(Order::class, 'orderable');
    }

    public function createItems($data, $save = true)
    {
        if ($this->items) {
            $this->items->each(function ($item) {
                $item->delete();
            });
        }


        if ($save) {
            foreach ($data as $item) {
                $this->items()->create($item);
            }
        } else {
            $collection = new Collection();

            foreach ($data as $item) {
                $collection->push(new InvoiceItem($item));
            }

            $this->items = $collection;
        }

    }


}
