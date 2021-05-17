<?php

$to = 'sam-mr-nobody@ya.ru';
$from = "From: Сообщение с твоего сайта: <senia.boy@yandex.ru>";
$email = $_POST['email'];
$name = $_POST['name'];
$message = $_POST['message'];
$page = 'Страница контактов';

$message = 
'<html>
<body>
'$.page.'
<br>
'$.email.' 
<br>
'$.message.'    
</body>
</html>';

$headers = "Content-type: text/html; charset=utf-8\r\n";
$headers .= $from;

if(filter_var($email, FILTER_VALIDATE_EMAIL)){
    mail($to, $name, $message, $headers);
}else{
    echo 1;
}