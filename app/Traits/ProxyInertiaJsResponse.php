<?php

namespace App\Traits;

use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Contracts\ControllerDispatcher;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Route;

trait ProxyInertiaJsResponse
{
    protected BaseController $baseController;

    public function __call(string $name, array $arguments)
    {
        $controllerDispatcher = app(ControllerDispatcher::class);
        $response             = $controllerDispatcher->dispatch(
            Route::getCurrentRoute(), $this->baseController, $name
        );

        if ($response instanceof \Inertia\Response) {
            return response()->json(
                invade($response)->props
            );
        } elseif ($response instanceof RedirectResponse) {
            if ($response->status() === 303) {
                return response()->noContent();
            } else {
                return $response;
            }
        }


        return $response;
    }
}
