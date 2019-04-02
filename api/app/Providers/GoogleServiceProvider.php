<?php

namespace App\Providers;

use App\Services\GoogleService;
use Illuminate\Support\ServiceProvider;

class GoogleServiceProvider extends ServiceProvider
{

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('google', function ($app) {
            $apiKey = config('services.google.key');
            $service = new GoogleService($apiKey);

            return $service;
        });
    }

}
