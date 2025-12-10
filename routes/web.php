<?php

use Illuminate\Support\Facades\Route;

// Catch-all route for Vue.js SPA
// This must be the LAST route in this file
// Vue Router will handle all client-side routing
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
