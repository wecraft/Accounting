<?php
/**
 * Created by PhpStorm.
 * User: simeo
 * Date: 3/17/2019
 * Time: 3:56 AM
 */

namespace App\Channels;

use Illuminate\Notifications\Notification;


class SocketIoChannel
{
    public function send($notifiable, Notification $notification)
    {
        $data = $notification->toSocketIo($notifiable);

        if ($id = $notifiable->id) {
            app('service')->socketEmit('notification', $data, "private-$id");
        }

    }
}