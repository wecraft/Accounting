<?php

namespace App\Notifications;

use App\Channels\SocketIoChannel;
use App\Extensions\AvatarableInterface;
use App\Profile;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification as BaseNotification;

class Notification extends BaseNotification implements ShouldQueue
{

    use Queueable;

    public static $notifType = '';
    public static $emailNotifSetting = true; //wheather to show or not notif settings tips in the email footer
    protected $nativeData = [];
    protected $emailData = [];
    protected $emailSubjectData = [];
    protected $smsData = [];
    protected $dates = [];

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed $notifiable
     *
     * @return array
     */
    public function via($notifiable)
    {
        $return = ['database', SocketIoChannel::class];

        return $return;
    }

    public function toMail($notifiable)
    {

    }

    public function toDatabase($notifiable)
    {

        return $this->nativeData;
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage($this->nativeData);
    }

    public function toSocketIo($notifiable)
    {
        return [
            'id'   => $this->id,
            'type' => get_class($this),
        ];
    }

    public function receivesBroadcastNotificationsOn()
    {
        return 'users.'.$this->id;
    }

    protected function getAvatar(AvatarableInterface $model)
    {
        if ($model->avatar) {
            $sources = app('fs')->getPublicUrls($model->avatar);
        }

        return $sources['small'];
    }

    public static function getNotifType()
    {
        return static::$notifType;
    }

    public function getCauser(Profile $profile)
    {
        $return = [
            'id'     => $profile->id,
            'avatar' => $this->getAvatar($profile),
            'name'   => $profile->name(),
        ];

        if (in_array($profile->group, ['Buyer', 'Vc', 'Spp', 'Pp'])) {
            $return['listing'] = $profile->model->listing->id;
        }

        return $return;
    }

}
