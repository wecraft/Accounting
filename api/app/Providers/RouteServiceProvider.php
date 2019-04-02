<?php

namespace App\Providers;

use Hash;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;
use Validator;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //Custom Validators
        Validator::extend('password_format', function ($attribute, $value, $parameters, $validator) {
            $regexp = "/^\S*(?=\S*[a-z])(?=\S*[\d])\S*$/";

            return (bool)preg_match($regexp, $value) || !$value;
        });
        Validator::extend('alpha_dash_space', function ($attribute, $value, $parameters, $validator) {
            $regexp = "/^[\pL\pM\s_-]+$/u";

            return (bool)preg_match($regexp, $value) || !$value;
        });
        Validator::extend('alpha_space', function ($attribute, $value, $parameters, $validator) {
            $regexp = "/^[\pL\pM\s]+$/u";

            return (bool)preg_match($regexp, $value) || !$value;
        });
        Validator::extend('video_vendor', function ($attribute, $value, $parameters, $validator) {
            return !$value || getVideoVendorIdFromUrl($value, $parameters[0]);
        });
        Validator::extend('alpha_num_space', function ($attribute, $value, $parameters, $validator) {
            $regexp = "/^[\pL\pM\pN\s]+$/u";

            return (bool)preg_match($regexp, $value) || !$value;
        });
        Validator::extend('alpha_dash_num_space', function ($attribute, $value, $parameters, $validator) {
            $regexp = "/^[\pL\pM\pN\s_-]+$/u";

            return (bool)preg_match($regexp, $value) || !$value;
        });
        Validator::extend('password_code', function ($attribute, $value, $parameters, $validator) {
            //return RequestToken::where('token', $value)->where('type', 'reset_password')->whereRaw('expires_on > now()')->first() ? true : false;
        });
        Validator::extend('old_password', function ($attribute, $value, $parameters, $validator) {
            return Hash::check($value, $parameters[0]) || !$value;
        });
        Validator::extend('name', function ($attribute, $value, $parameters, $validator) {
            $regexp = "/^[\pL\pM\s_-]{1,24}$/u";

            return (bool)preg_match($regexp, $value) || !$value;
        });
        Validator::extend('business_name', function ($attribute, $value, $parameters, $validator) {

            return mb_strlen($value) <= 128 || !$value;
        });
        Validator::extend('location', function ($attribute, $value, $parameters, $validator) {
            if (!$value) {
                return true;
            }

            return (bool)app('google')->getPlace($value);
        });
        Validator::extend('phone', function ($attribute, $value, $parameters, $validator) {
            $regexp = "/^[\pN\s-\(\)]{8,24}$/u";

            return (bool)preg_match($regexp, $value) || !$value;
        });

        Validator::extend('recaptcha', function ($attribute, $value, $parameters, $validator) {
            $curl = curl_init();
            $curl_opt = array(
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_SSL_VERIFYPEER => 0,
                CURLOPT_POST           => 1,
                CURLOPT_POSTFIELDS     => http_build_query(array(
                    "secret"   => config('services.recaptcha.secret'),
                    "response" => $value,
                    "remoteip" => $_SERVER["REMOTE_ADDR"],
                )),
                CURLOPT_URL            => "https://www.google.com/recaptcha/api/siteverify",
            );
            curl_setopt_array($curl, $curl_opt);
            $result = curl_exec($curl);
            curl_close($curl);

            return (bool)json_decode($result)->success;
        });
        Validator::extend('video_url', function ($attribute, $value, $parameters, $validator) {
            if (!$value) {
                return true;
            }
            $result = false;
            foreach (['youtube', 'vimeo', 'facebook'] as $vendor) {
                if (!$result) {
                    $result = vendor_video_id($value, $vendor);
                }
            }

            return (bool)$result;
        });

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }
}