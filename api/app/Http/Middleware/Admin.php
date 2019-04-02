<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

class Admin
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
        $profile_id = $request->header('Profile');
        define("USER_PROFILE", $profile_id);
        Auth::user()->load('profile.model');

        if (!Auth::user()->profile->inAdminGroup()) {
            throw new \Exception('Not authorized!', 403);
        }

        return $next($request);
    }
}