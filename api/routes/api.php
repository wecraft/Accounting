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
            Route::apiResource('video', 'VideoController');
        });
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
