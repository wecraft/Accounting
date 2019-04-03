<?php

/**
 * Description of AppService
 *
 * @author Wecraft Media
 */

namespace App\Services;

use App\Currency;
use App\CurrencyRate;
use App\Events\Pusher;
use App\Http\Resources\Resource;
use App\Jobs\SocketIoEmitterJob;
use App\Model;
use Goez\SocketIO\Emitter;
use Predis\Client as PredisClient;

class AppService
{

    /**
     * @var PredisClient
     */
    public $redisClient = null;

    public function push1($message, $data, $private = false)
    {
        if ($private && is_array($private)) {
            foreach ($private as $p) {
                event(new Pusher($message, $data, $p));
            }

            return;
        }
        event(new Pusher($message, $data, $private));
    }


    public function push($topic, $data, $private = false)
    {
        SocketIoEmitterJob::dispatch($topic, $data, $private)->onQueue('default');
    }

    public function socketEmit($topic, $data, $room)
    {
        if (!$this->redisClient) {
            $this->redisClient = new PredisClient(config('database.redis.default'));
        }

        (new Emitter($this->redisClient))->to($room)->emit('message', [
            'topic' => $topic,
            'data'  => $data,
        ]);
    }

    public function sendMail($type, $data, $receivers, $subject = null, $replyTo = null, $remove_attachments = true)
    {
        SendMail::dispatch($type, $data, $receivers, $subject, $replyTo, $remove_attachments)->onQueue('low');
    }

    public function log($action, $model = null, $properties = null, $name = 'default')
    {

        $activity = activity($name);

        if ($model instanceof Model) {
            $activity->performedOn($model);
        }

        if ($properties) {
            if (!isset($properties['subject_name'])) {
                $properties['subject_name'] = $properties['name'];
            }

            $activity->withProperties($properties);
        }

        $activity->log($action);
    }

    public function resource(Model $model, $includes = '')
    {
        $resource = new Resource($model, $includes);

        $response = response()->json($resource->resolve());

        $data = $response->getData(true);

        return $data;
    }

    public function getCurrencyRate($currency, $date = null, $yesterday = false, $to = 'BGN')
    {
        if (!($currency instanceof Currency)) {
            $currency = Currency::where('id', $currency)->first();
        }

        if ($currency->name == $to) {
            return 1;
        }

        if (!$date) {
            $date = date("Y-m-d");
        }

        if ($yesterday) {
            $date = date('Y-m-d', strtotime("$date -1 day"));
        }

        $check = CurrencyRate::where('currency_id', $currency->id)->date($date)->first();

        if ($check) {
            return $check->rate;
        }

        $from = $currency->name;

        $amount = getCurrencyRate($date, $from, $to);

        $rate = new CurrencyRate([
            'rate' => $amount,
        ]);

        $rate->currency()->associate($currency);
        $rate->created_at = date("Y-m-d H:i:s", strtotime($date));

        $rate->save();

        return $amount;

    }
}
