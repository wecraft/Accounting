<?php

namespace App\Http\Resources;

class NotificationResource extends Resource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function _toArray($request)
    {

        $data = $this->resource->data;
        $causer = $data['causer'];
        unset($data['causer']);

        $return = [
            'id'        => $this->id,
            'type'      => $this->resource->getType(),
            'message'   => $this->getMessage($data, $causer),
            'data'      => $data,
            'causer'    => $causer,
            'read'      => $this->resource->read(),
            'createdAt' => strtotime($this->resource->created_at) * 1000,
        ];

        return $return;
    }

    private function getMessage($notifData, $causer)
    {
        $type = $this->resource->getType();

        $message = null;

        switch ($type) {
            case 'new_webinar_series_request':
                $data = [
                    'profile'        => $causer['name'],
                    'webinar_series' => $notifData['webinarSeries']['name'],
                ];
                break;
            case 'approved_webinar_series_request':
            case 'rejected_webinar_series_request':
                $data = [
                    'name' => $notifData['webinarSeries']['name'],
                ];
                break;
            case 'assist_request':
                $message = trans_choice('notifications.'.$type, $notifData['assist']['type']);
                break;
            case 'new_signup':
                $data = [
                    'name'  => $notifData['name'],
                    'email' => $notifData['email'],
                ];
                break;
            case 'new_listing':
                $data = [
                    'name' => $notifData['listing']['name'],
                    'type' => __('messages.'.$notifData['listing']['type']),
                ];
                break;
            case 'coupon_code':
                $data = [
                    'code' => $notifData['code'],
                    'name' => $notifData['listing']['name'],
                    'type' => __('messages.'.$notifData['listing']['type']),
                ];
                break;
            case 'invitee_connected':
                $data = [
                    'name' => $causer['name'],
                ];
                break;
            case 'invitation_rejected':
                $data = [
                    'email' => $notifData['email'],
                ];
                break;
            default:
                $data = [];
        }
        if (!$message) {
            $message = __('notifications.'.$type, $data);
        }

        return $message;
    }
}