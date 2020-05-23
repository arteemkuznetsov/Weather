<?php
include 'db-connect.php';

$id = $_GET['id'];

if ($conn) {
    $result = $conn -> query(
        "DELETE FROM accounts WHERE id = '$id'");
    if ($result) {
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
