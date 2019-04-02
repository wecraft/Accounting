<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

	<head>
		<title>Succession Matching</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">

				<link href='http://fonts.googleapis.com/css?family=Raleway:600,700,400' rel='stylesheet' type='text/css'>


					<!--  General CSS  -->
					<style type="text/css">
						html {
							width: 100%;
						}

						body {
							width: 100%;
							margin: 0;
							padding: 0;
							-webkit-font-smoothing: antialiased;
							mso-margin-top-alt: 0px;
							mso-margin-bottom-alt: 0px;
							mso-padding-alt: 0px 0px 0px 0px;
							background: #E7E7E7;
						}

						p,
						h1,
						h2,
						h3,
						h4 {
							margin-top: 0;
							margin-bottom: 0;
							padding-top: 0;
							padding-bottom: 0;
						}

						table {
							font-size: 14px;
							border: 0;
						}

						img {
							border: none !important;
						}
					</style>

					<!--  Responsive CSS  -->
					<style type="text/css">
						@media only screen and (max-width: 800px) {
							body[yahoo] .quote_full_width {
								width: 100% !important;
							}
							body[yahoo] .quote_content_width {
								width: 90% !important;
							}
						}

						@media only screen and (max-width: 640px) {
							body[yahoo] .full_width {
								width: 100% !important;
							}
							body[yahoo] .content_width {
								width: 80% !important;
							}
							body[yahoo] .center_txt {
								text-align: center !important;
							}
							body[yahoo] .post_sep {
								width: 100% !important;
								height: 60px !important;
							}
							body[yahoo] .gal_sep {
								width: 100% !important;
								height: 40px !important;
							}
							body[yahoo] .gal_img {
								width: 100% !important;
							}
							body[yahoo] .bb_space {
								height: 90px !important;
							}

						}
					</style>
					</head>

					<body style="margin: 0; padding: 0;" yahoo="fix">

						<!--  billboard  -->
						<table border="0" cellpadding="0" cellspacing="0" width="100%" background="{{asset("img/Gradient.jpg")}}" bgcolor="#4CB8A8" style="background-image:url('{{asset("img/Gradient.jpg")}}'); background-size: 100% auto; -webkit-background-size: 100% auto; -moz-background-size: 100% auto; -o-background-size: 100% auto; background-position: top center; background-repeat: repeat-y; background-color:#4CB8A8;">

							<!--  header  -->
							<tr>
								<td>
									<table cellpadding="0" cellspacing="0" align="center" border="0" style="width: 100%; max-width: 600px; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0; text-align:center;" class="content_width">
										<!--  spacing  -->
										<tr>
											<td width="100%" height="40">&nbsp;</td>
										</tr>
										<!--  end spacing  -->

										<!--  Logo  -->
										<tr>
											<td>
												<img src="{{asset("img/Logo-white.png")}}" alt="SuccessionMatching" width="141" height="43" alt="" title="" border="0" style="border:0; display:inline_block;" />
											</td>
										</tr>
										<!--  end logo  -->

										<!--  spacing  -->
										<tr>
											<td width="100%" height="40">&nbsp;</td>
										</tr>
										<!--  end spacing  -->

										<!--  vertical separator  -->
										<tr>
											<td>
												<table height="1" align="center" bgcolor="#fff" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px;height:1px!important; max-width:600px; background-color:#fff; padding:0; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
													<tr>
														<td></td>
													</tr>
												</table>
											</td>
										</tr>
										<!--  end vertical separator  -->
									</table>
								</td>
							</tr>
							<!--  end header  -->

							@yield('header')

							<!--  spacing  -->
							<tr>
								<td height="80">&nbsp;</td>
							</tr>
							<!--  end spacing  -->

						</table>
						<!--  end billboard  -->

						@yield('content')

						<!--  footer  -->
						<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f5f5" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">

							<tr>
								<td>
									<!--  footer top block  -->
									<table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px;border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0px;" class="content_width">
										<!--  spacing  -->
										<tr>
											<td width="100%" height="40">&nbsp;</td>
										</tr>
										<!--  end spacing  -->

										<!--  content  -->
										<tr>
											<td style="text-align: center;color: #777; font-family: 'Raleway', Helvetica, Arial, sans-serif; font-size: 14px; letter-spacing:0.5px; font-weight: 400;">
												{{__('messages.need_a_help', [], $locale)}}
												<br/>
												<br/>
												<a style="color: #777;font-weight: 600" href="tel:+13069925547">+1 306 992 5547</a> |
												<a style="color: #777;font-weight: 600" href="mailto:hello@successionmatching.com">hello@successionmatching.com</a>
											</td>


										</tr>
										<!--  spacing  -->
										<tr>
											<td width="100%" height="40">&nbsp;</td>
										</tr>
										<!--  end spacing  -->
										<!--  content  -->
										<tr>
											<td style="text-align: center;">
												<img src="{{asset("img/Logo-dark.png")}}" alt="SuccessionMatching" width="39" height="43" alt="" title="" border="0" style="border:0; display:inline_block;">
											</td>


										</tr>
										<!--  content  -->

										<!--  spacing  -->
										<tr>
											<td width="100%" height="40">&nbsp;</td>
										</tr>
										<!--  end spacing  -->

										<!--  vertical separator  -->
										<tr>
											<td>
												<table height="1" align="center" bgcolor="#e5e5e5" border="0" cellpadding="0" cellspacing="0" style="width: 100%;max-width: 600px;height:1px!important; background-color:#e5e5e5; padding:0; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
													<tr>
														<td></td>
													</tr>
												</table>
											</td>
										</tr>
										<!--  end vertical separator  -->
									</table>
									<!--  end footer top block  -->

									<!--  footer bottom block  -->
									<table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="content_width">
										<tr>
											<td width="100%" height="40"></td>
										</tr>
										<!--  end spacing  -->

										<!--  content  -->
										<tr>
											<td>
												<!--  copyrights  -->
												<table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="full_width center_txt">
													<tr>
														<td style="color: #414d5f; font-family: 'Raleway', Helvetica, Arial, sans-serif; font-size: 12px; letter-spacing:.5px; font-weight: 400;">
															© 2018
															<a href="{{$origin}}" target="_blank" style="color: #555; font-weight: 600; text-decoration:none;">{{$originName}}</a>. {{__('messages.all_rights_reserved', [], $locale)}}
														</td>
													</tr>
												</table>
												<!--  end copyrights  -->

												<!--  spacing  -->
												<table height="40" align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="full_width">
													<tr>
														<td>&nbsp;</td>
													</tr>
												</table>
												<!--  end spacing  -->

												<!--  social media  -->
												<table align="right" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="full_width center_txt">
													<tr>
														<td>
															<a href="https://www.facebook.com/SuccessionMatching/" target="_blank" style="color: #414d60; text-decoration:none;">
																<img src="{{asset("img/facebook.png")}}" alt="Facebook" width="7" height="12" alt="" title="" border="0" style="border:0; display:inline_block;" />
															</a>
															&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
															<a href="https://twitter.com/sxnm" target="_blank" style="color: #414d60; text-decoration:none;">
																<img src="{{asset("img/twitter.png")}}" alt="Twitter" width="14" height="10" alt="" title="" border="0" style="border:0; display:inline_block;" />
															</a>
														</td>
													</tr>
												</table>
												<!--  end social media  -->
											</td>
										</tr>
										<!--  end content  -->

										<!--  spacing  -->
										<tr>
											<td width="100%" height="40">&nbsp;</td>
										</tr>
										<!--  end spacing  -->
									</table>
									<!--  end footer bottom block  -->
								</td>
							</tr>
						</table>
						<!--  end footer  -->

					</body>

					</html>
