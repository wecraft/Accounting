@extends('email.layout')

@section('header')
    <!--  download btn  -->
    <tr>
        <td>
            <table cellpadding="0" cellspacing="0" align="center"
                   style="width: 100%; max-width: 600px;border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"
                   class="content_width">
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0" align="left"
                               style="width: 100%; max-width: 600px; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"
                               class="center">
                            <tr>
                                <td width="100%" height="20"></td>
                            </tr>
                            <tr>
                                <td>

                                    <table width="100%" cellpadding="0" cellspacing="0" align="center"
                                           style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; text-align:center;">
                                        <tr>
                                            <td align="center" style="text-align:center;">
                                                <img src="{{asset("img/Verify-email-icon.png")}}" alt="Welcome">
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>
                            <tr>
                                <td width="100%" height="20"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
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
                                <td style="color: #fff; font-family: 'Raleway', Helvetica, Arial, sans-serif; font-size: 34px; font-weight: 600;  line-height:normal; letter-spacing:1px; text-align: center">
                                    {{__('messages.hello', [
                                                                    'name' => $name
                                                                ], $locale)}},
                                    <br/>
                                    <span style="font-size: 24px;font-weight: normal">{{__('messages.welcome_to', [
															'name' => 'SuccessionMatching'
															], $locale)}}</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!--  end caption  -->



    <!--  spacing  -->
    <tr>
        <td height="100" width="100%">&nbsp;</td>
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
                        <td style="color: #777; font-family: 'Raleway', Helvetica, Arial, sans-serif; line-height: 1.5em; font-size: 18px; font-weight: 600; ">
                            {{__('messages.thanks_for_signingup', [
                                                'name' => 'SuccessionMatching'
                                                    ], $locale)}}
                            <br/>
                            <br/>
                            {{__('messages.confirm_email', [
                                            'name' => 'SuccessionMatching'
                                                    ], $locale)}}
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
                                           style="display:block; width:100%; color: #fff; font-family: 'Raleway', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600;text-decoration:none !important;"><br/>{{__('messages.confirm_now', [], $locale)}}
                                            <br/>&nbsp;</a>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="100%" height="100"></td>
        </tr>
    </table>
    <!--  end features section  -->

@endsection