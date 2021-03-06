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

        if ($request->has('amount')) {
            $request->merge([
                'amount' => str_replace(',', '.', $request->amount),
            ]);
        }
        if ($request->has('amount1')) {
            $request->merge([
                'amount1' => str_replace(',', '.', $request->amount1),
            ]);
        }
        if ($request->has('amount2')) {
            $request->merge([
                'amount2' => str_replace(',', '.', $request->amount2),
            ]);
        }

        return $next($request);
    }

}
