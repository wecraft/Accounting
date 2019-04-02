<?php
return [
	'alpha'					 => 'This field can contain only lettering!',
	'alpha_space'			 => 'This field can contain only lettering!',
	'alpha_dash'			 => 'This field can contain only lettering and dashes!',
	'alpha_dash_space'		 => 'This field can contain only lettering and dashes!',
	'name'					 => 'This field can contain only lettering and dashes! Must contain between 2 and 24 symbols!',
	'alpha_num'				 => 'This field can contain only lettering and numbers!',
	'alpha_num_space'		 => 'This field can contain only lettering and numbers!',
	'alpha_dash_num_space'	 => 'This field can contain only lettering, numbers and dashes!',
	'business_name'			 => 'This field can contain only lettering, numbers and dashes! Must contain between 2 and 32 symbols!',
	'date'					 => 'Invalid date!',
	'email'					 => 'Invalid email!',
	'exists'				 => 'The option is not exists!',
	'image'					 => 'Not allowed file type!',
	'integer'				 => 'This field can contain only numbers!',
	'max'					 => [
		'file'	 => 'The file size is too large!', //(:max KB)
		'string' => 'This field must contain maximum :max symbols!',
	],
	'mimes'					 => 'Not allowed file type!', //(:values)
	'mimetypes'				 => 'Not allowed file type!', //(:values)
	'min'					 => [
		'string' => 'This field must contain at least :min symbols!',
	],
	'regex'					 => 'The :attribute format is invalid.',
	'required'				 => 'This field is required!',
	'required_if'			 => 'This field is required!',
	'required_unless'		 => 'This field is required!',
	'required_with'			 => 'This field is required!',
	'required_with_all'		 => 'This field is required!',
	'required_without'		 => 'This field is required!',
	'required_without_all'	 => 'This field is required!',
	'url'					 => 'Invalid url!',
	'password_format'		 => "The password field must contain at least one number!",
	'password'				 => "Passwords don't match!",
	'old_password'			 => "Invalid old password!",
	'password_code'			 => "Invalid or expired code.",
	'video_vendor'			 => "Invalid url!",
	'location'				 => "Invalid location! Please choose from the dropdown!",
	'phone'					 => 'Invalid phone number!',
	'video_url'				 => 'Invalid video resource url!',
	'custom'				 => [
		'password'			 => [
			'confirmed'	 => "Passwords does not match!",
			'password'	 => "Invalid password!"
		],
		'verification_code'	 => [
			'in' => 'Invalid verification code.'
		],
		'recaptcha'			 => [
			'*' => 'Please confirm you are not a robot.'
		],
		'*.end_date'		 => [
			'required_unless' => 'This field is required!'
		],
		'url'				 => [
			'required_unless' => 'This field is required!'
		],
		'code'				 => [
			'in' => 'Invalid code!.'
		],
		'email'				 => [
			'unique'	 => 'A user with this email address already exists!',
			'exists'	 => 'A user with this email doesn\'t exists on SuccessionMatching database!',
			'confirmed'	 => "Emails does not match!"
		],
		'old_password'		 => [
			'password' => 'Invalid old password!'
		]
	],
//	'attributes' => [
//		//Exps
//		"exps.*.employer" => 'employer',
//		"exps.*.name" => 'name',
//		"exps.*.description" => 'description',
//		"exps.*.start_date" => 'start date',
//		"exps.*.end_date" => 'end date',
//		//Edus
//		"edus.*.school" => 'school',
//		"edus.*.description" => 'description',
//		"edus.*.start_date" => 'start date',
//		"edus.*.end_date" => 'end date',
//		//Langs
//		"langs.*.lang" => 'language',
//		"langs.*.level" => 'level',
//		//Refs
//		'refs.*.name' => 'name',
//		'refs.*.company' => 'company',
//		'refs.*.phone' => 'phone',
//		'refs.*.description' => 'description',
//		//Certs
//		'certs.*.name' => 'name',
//		'certs.*.description' => 'description',
//		'certs.*.date' => 'date',
//		//FIles
//		'docs.*.file' => 'file',
//		'host_email' => 'email',
//	],
	'invalid_phone'			 => 'Invalid phone number!'
];
