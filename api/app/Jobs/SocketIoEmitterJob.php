<?php

namespace App\Jobs;

use App\Services\AppService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SocketIoEmitterJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $topic;
    private $data;
    private $private;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($topic, $data, $private)
    {
        $this->topic = $topic;
        $this->data = $data;
        $this->private = $private;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(AppService $service)
    {
        if ($this->private && is_array($this->private)) {
            foreach ($this->private as $p) {
                $service->socketEmit($this->topic, $this->data, "private-$p");
            }

            return;
        }
        $service->socketEmit($this->topic, $this->data, "public-default");
    }
}
