<?php

namespace App\Http\Controllers\Jetstream;

use App\Http\Controllers\Controller;
use App\Traits\ProxyInertiaJsResponse;
use Laravel\Jetstream\Http\Controllers\Inertia\CurrentUserController as JetstreamCurrentUserController;

class CurrentUserController extends Controller
{
    use ProxyInertiaJsResponse;

    public function __construct()
    {
        $this->baseController = new JetstreamCurrentUserController();
    }
}
