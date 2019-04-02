<?php

/**
 * Description of AppError
 *
 * @author Wecraft Media
 */

namespace App\Exceptions;

class AppException extends \Exception
{

    /**
     * Render an exception into a response.
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
            'code'    => $this->getCode(),
        ], $this->getCode());
    }

}
