<?php

namespace App\Http\Middleware;

use Closure;

class TransformRequest
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure                 $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //Transform Request if need

        if ($request->has('passwordConfirmation')) {
            $request->merge([
                'password_confirmation' => $request->passwordConfirmation,
            ]);
        }

        return $next($request);
    }

}
