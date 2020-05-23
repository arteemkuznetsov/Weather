<?php
include 'db-connect.php';

$login = $_GET['login'];

if ($conn) {
    $conn -> query(
        "DELETE FROM accounts WHERE login = '$login'");
    if ($conn->affected_rows > 0) {
        $json = [
            'status' => 'success',
            'message' => 'Удаление прошло успешно!'
        ];
    }
    else {
        $json = [
            'status' => 'fail',
            'message' => 'Пользователь не существует!'
        ];
    }
    $conn -> close();
}
$json = json_encode($json, JSON_UNESCAPED_UNICODE);
echo $json;
