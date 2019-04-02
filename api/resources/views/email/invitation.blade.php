@extends('email.layout')

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
                            {{__('messages.invitation', ['name' => $name], $locale)}}
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
                                           style="display:block; width:100%; color: #fff; font-family: 'Raleway', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600;text-decoration:none !important;"><br/>{{__('messages.create_account', [], $locale)}}
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