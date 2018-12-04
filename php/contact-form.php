<?php

function post_captcha($user_response) {
    $fields_string = '';
    $fields = array(
        'secret' => '6Ldcwn4UAAAAAFsj1zZ0ViZOQT4yr4qFAUd79CCe',
        'response' => $user_response
    );
    foreach($fields as $key=>$value)
    $fields_string .= $key . '=' . $value . '&';
    $fields_string = rtrim($fields_string, '&');

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
    curl_setopt($ch, CURLOPT_POST, count($fields));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);

    $result = curl_exec($ch);
    curl_close($ch);

    return json_decode($result, true);
}

if($_REQUEST['name'] == '' || $_REQUEST['email'] == '' ||  $_REQUEST['message'] == ''):
  return "error";
endif;

// Call the function post_captcha
$res = post_captcha($_POST['g-recaptcha-response']);

if (!$res['success']):
    return "Please check your CAPTCHA and try sending your message again.";

elseif (filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL)):
    $subject = 'Stanographer.com form submission'; // Subject of your email
    
    // Receiver email address
    $to = 'stanley@stanographer.com';  //Change the email address by yours
 
    // prepare header
    $header = 'From: '. $_REQUEST['name'] . ' <'. $_REQUEST['email'] .'>'. "\r\n";
    $header .= 'Reply-To:  '. $_REQUEST['name'] . ' <'. $_REQUEST['email'] .'>'. "\r\n";
    $header .= 'X-Mailer: PHP/' . phpversion();

    // prepare massage
    $message = '';
    $message .= 'Name: ' . $_REQUEST['name'] . "\n";
    $message .= 'Email: ' . $_REQUEST['email'] . "\n";
    $message .= 'Message: '. $_REQUEST['message'];

    // Send contact information
    $mail = mail( $to, $subject , $message, $header );

    echo 'sent';
else:
    return "error";
endif;

?>