<?php
include 'db-connect.php';

$json = [];

$login = htmlspecialchars($_POST['login']);
$new_name = htmlspecialchars($_POST['name']);

if ($conn) {
    $result = $conn -> query(
        "UPDATE accounts SET name = '$new_name' WHERE login = '$login'");
    if ($result) {
        // меняем данные в сессии чтобы после перезагрузки страницы они были свежими
        session_start();
        $_SESSION['username'] = $new_name;

        $json = [
            'status' => 'success',
            'new_name' => $new_name
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
