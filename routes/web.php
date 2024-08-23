<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {

});

Route::get('/{any}', function() {
    return view('app');
})->where('any', '^(?!api).*');
