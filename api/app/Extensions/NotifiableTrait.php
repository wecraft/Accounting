<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Extensions;

use App\Notification;
use Illuminate\Notifications\Notifiable;

/**
 *
 * @author Wecraft Media
 */
trait NotifiableTrait
{

    use Notifiable;

    public function notifications()
    {
        return $this->morphMany('App\Notification', 'notifiable')
            ->orderBy('created_at', 'desc');
    }

    public function newNotifications()
    {
        return $this->notifications()
            ->whereNull('seen_at');
    }

    public function seeNotifications()
    {
        return $this->newNotifications()->each(function (Notification $notification) {
            $notification->markAsSeen();
        });
    }

}
