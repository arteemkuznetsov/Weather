<?php
include 'db-connect.php';

$json = [];

$login = htmlspecialchars($_POST['login']);
$new_password = htmlspecialchars($_POST['password']);
$hash = password_hash($new_password, PASSWORD_BCRYPT);

if ($conn) {
    $result = $conn -> query(
        "UPDATE accounts SET passw = '$hash' WHERE login = '$login'");
    if ($result) {
        // меняем данные в сессии чтобы после перезагрузки страницы они были свежими
        session_start();
        $_SESSION['password'] = $new_password;

        $json = [
            'status' => 'success',
            'new_password' => $new_password
        ];
    }
    else {
        $json = [
            'status' => 'fail'
        ];
    }
    $conn -> close();
}

$json = json_encode($json, JSON_UNESCAPED_UNICODE);
echo $json;
