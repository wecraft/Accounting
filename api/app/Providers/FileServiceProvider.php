<?php

namespace App\Providers;

use App\Services\FileService;
use Illuminate\Support\ServiceProvider;

class FileServiceProvider extends ServiceProvider
{

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $imageKeys = config('filesystems.image_keys', []);

        foreach ($imageKeys as $key => $options) {
            $this->app->fs->attachImageKey($key, $options);
        }
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton("fs", function ($app) {
            return new FileService();
        });
    }

}
