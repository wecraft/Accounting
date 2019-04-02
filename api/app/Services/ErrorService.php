<?php

/**
 * Description of ErrorService
 *
 * @author Wecraft Media
 */

namespace App\Services;

use App\Exceptions\AppException;

class ErrorService
{

    public function make($message, $code = 500)
    {
        throw new AppException($message, $code);
    }

    public function notFound($message = 'Resource not found!', $code = 404)
    {
        throw new AppException($message, $code);
    }

}
