<?php

namespace App\Providers;

use App\File;
use App\Observers\ArticleObserver;
use App\Observers\FileObserver;
use App\Observers\FolderObserver;
use App\Observers\GalleryObserver;
use App\Observers\ProfileObserver;
use App\Observers\SellerListingObserver;
use App\Observers\SellerListingOwnerObserver;
use App\Observers\VideoObserver;
use App\Services\AppService;
use App\Services\ErrorService;
use App\Services\QuestionService;
use Config;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(Request $request)
    {
        error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING ^ E_DEPRECATED ^ E_STRICT);

        if ($offset = $this->app->request->header('Offset')) {
            Config::set('app.time_offset', (int)$offset * (-1));
        }

        if ($origin = $this->app->request->header('Web-Origin')) {
            Config::set('app.origin', $origin);
        }


        File::observe(FileObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('error', function ($app) {
            return new ErrorService();
        });
        $this->app->singleton('service', function ($app) {
            return new AppService();
        });
    }
}