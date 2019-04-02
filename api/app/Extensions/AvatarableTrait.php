<?php

/**
 * Description of AvatarTrait
 *
 * @author Wecraft Media
 */

namespace App\Extensions;

trait AvatarableTrait
{

    use FilableTrait;

    public function avatar()
    {
        return $this->morphOne('App\File', 'object')->where('attached_on', 'avatar');
    }

}
