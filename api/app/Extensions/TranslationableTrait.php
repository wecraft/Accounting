<?php

namespace App\Extensions;

use App\Scopes\TranslationScope;

trait TranslationableTrait
{

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new TranslationScope);
    }

    public function translations()
    {
        return $this->morphMany('App\Translation', 'translatable');
    }

    public function scopeTranslate($query)
    {
        return $query->with("translations");
    }

}
