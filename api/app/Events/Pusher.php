<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Pusher implements ShouldBroadcast
{

    use Dispatchable,
        InteractsWithSockets,
        SerializesModels;

    public $content;
    private $room = 'public-default';

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message, $data, $private = false)
    {
        $this->content = [
            "message" => $message,
            "data"    => $data,
        ];
        if ($private) {
            $this->room = 'private-room-'.$private;
        }
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return [$this->room];
    }

}
