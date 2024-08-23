<?php

namespace App\Http\Controllers\Jetstream;

use App\Http\Controllers\Controller;
use App\Traits\ProxyInertiaJsResponse;
use Laravel\Jetstream\Http\Controllers\Inertia\ApiTokenController as JetstreamApiTokenController;

class ApiTokenController extends Controller
{
    use ProxyInertiaJsResponse;

    public function __construct()
    {
        $this->baseController = new JetstreamApiTokenController;
    }
}
