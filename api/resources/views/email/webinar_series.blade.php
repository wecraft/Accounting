@extends('email.layout')


@section('header')
    <!--  end download btn  -->

    <!--  spacing  -->
    <tr>
        <td height="40">&nbsp;</td>
    </tr>
    <!--  end spacing  -->

    <!--  caption  -->
    <tr>
        <td>
            <table cellpadding="0" cellspacing="0" align="center" class="content_width"
                   style="max-width: 600px;border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0"
                               style="max-width: 600px;border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"
                               class="content_width" align="center">
                            <tr>
                                <td style="text-transform:uppercase; color: #fff; font-family: 'Raleway', Helvetica, Arial, sans-serif; font-size: 34px; font-weight: 600;  line-height:normal; letter-spacing:1px; text-align: center">

                                    <span style="font-size: 24px;font-weight: normal">{{__('messages.webinar_series_head', [
															'year' => $year
															], $locale)}}</span>
                                    <br/>
                                    <span style="font-size: 24px;font-weight: normal">{{$webinarSeriesName}}</span>
                                    <br/>
                                    <span style="font-size: 24px;font-weight: normal">{{$date}}</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!--  end spacing  -->
@endsection




@section('content')

    <!--  features section  -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#fbfbfb"
           style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
        <!--  spacing  -->
        <tr>
            <td width="100%" height="50">&nbsp;</td>
        </tr>
        <!--  end spacing  -->

        <tr>
            <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0"
                       style="max-width: 600px;text-align:center;" class="content_width">
                    <!--  section title  -->
                    <tr>
                        <td style="color: #777; font-family: 'Raleway', Helvetica, Arial, sans-serif; line-height: 1.5em; font-size: 18px; text-align: left">
                            {!!__('messages.webinar_series_description', [
                                'webinar_series_name' => $webinarSeriesName,
                                'year' => $year,
                                'date' => $date
                            ], $locale) !!}
                        </td>
                    </tr>
                    <!--  end section title  -->

                    <!--  spacing  -->
                    <tr>
                        <td width="100%" height="20">&nbsp;</td>
                    </tr>
                    <!--  end spacing  -->


                </table>
            </td>
        </tr>
        <tr>
            <td width="100%" height="40"></td>
        </tr>

        @if($url)
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                           style="max-width: 600px;text-align:center;" class="content_width">
                        <!--  section title  -->
                        <tr>
                            <td style="color: #777; font-family: 'Raleway', Helvetica, Arial, sans-serif; line-height: 1.5em; font-size: 18px; font-weight: 600; ">
                                {{__('messages.take_survey_description', [], $locale)}}
                            </td>
                        </tr>
                        <!--  end section title  -->

                        <!--  spacing  -->
                        <tr>
                            <td width="100%" height="20">&nbsp;</td>
                        </tr>
                        <!--  end spacing  -->


                    </table>
                </td>
            </tr>
            <tr>
                <td width="100%" height="40"></td>
            </tr>
            <tr>
                <td align="center">
                    <table width="210" cellpadding="0" cellspacing="0" align="center"
                           background="{{asset("img/Gradient.jpg")}}" bgcolor="#4CB8A8"
                           style="cursor: pointer; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; background-image:url('{{asset("img/Gradient.jpg")}}'); background-size: 100% auto; -webkit-background-size: 100% auto; -moz-background-size: 100% auto; -o-background-size: 100% auto; background-position: top center; background-repeat: repeat-y; background-color:#4CB8A8; border-radius: 5px;">

                        <tr>
                            <td>

                                <table width="100%" cellpadding="0" cellspacing="0" align="center"
                                       style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; text-align:center;">
                                    <tr>
                                        <td align="center" style="text-align:center;">
                                            <a href="{{$url}}"
                                               style="display:block; width:100%; color: #fff; font-family: 'Raleway', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600;text-decoration:none !important;"><br/>{{__('messages.take_survey', [], $locale)}}
                                                <br/>&nbsp;</a>
                                        </td>
                                    </tr>
                                </table>

                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!--  spacing  -->
            <tr>
                <td width="100%" height="50">&nbsp;</td>
            </tr>
            <!--  end spacing  -->
        @endif


        <tr>
            <td width="100%" height="100"></td>
        </tr>
    </table>
    <!--  end features section  -->

@endsection