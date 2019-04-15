<?php

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
 */

$namespace = "namespace";

Route::$namespace('Api')->group(function () use ($namespace) {

    Route::group(['middleware' => ['jwt.auth']], function ($router) use ($namespace) {

        Route::group([
            'middleware' => ['admin'],
        ], function ($router) use ($namespace) {


            Route::get('order/count', 'OrderController@count');
            Route::apiResource('order', 'OrderController');

            Route::get('account_trans/count', 'AccountTransactionController@count');
            Route::apiResource('account_trans', 'AccountTransactionController');

            Route::get('user_trans/count', 'UserTransactionController@count');
            Route::apiResource('user_trans', 'UserTransactionController');

            Route::apiResource('invoice', 'InvoiceController');

            Route::get('project/count', 'ProjectController@count');
            Route::apiResource('project', 'ProjectController');

            Route::apiResource('currency', 'CurrencyController');

            Route::apiResource('account', 'AccountController');

            Route::get('client/count', 'ClientController@count');
            Route::apiResource('client', 'ClientController');

            Route::apiResource('dashboard', 'DashboardController');

        });

        Route::apiResource('country', 'CountryController');
    });
});


Route::group([
    'middleware' => 'api',
], function ($router) use ($namespace) {
    Route::group([
        'prefix' => 'auth',
    ], function ($router) use ($namespace) {
        Route::post('login', 'AuthController@login');
        Route::post('logout', 'AuthController@logout');
        Route::get('refresh', 'AuthController@refresh');
        Route::get('me', 'AuthController@me');

    });
});
