{{__('messages.webinar_series_head', [
'year' => $year
], $locale)}}

$webinarSeriesName

$date

{{__('messages.webinar_series_description', [
                                'webinar_series_name' => $webinarSeriesName,
                                'year' => $year,
                                'date' => $date
                            ], $locale)}}

@if($url)
    {{__('messages.take_survey_description', [], $locale)}}

    <a href="{{$url}}">{{__('messages.take_survey', [], $locale)}}</a>
@endif





