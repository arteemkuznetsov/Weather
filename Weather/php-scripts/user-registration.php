<?php
// password_hash() создает хеш пароля используя сильный, необратимый алгоритм хеширования
// При использовании функции password_hash() возвращаемое значение уже содержит соль как часть созданного хеша.
include 'db-connect.php';

$json = [];

// пытаемся защититься от инъекций как умеем
$name = htmlspecialchars($_POST['name']);
$login = htmlspecialchars($_POST['login']);
$password = htmlspecialchars($_POST['password']);

$hash = password_hash($password, PASSWORD_BCRYPT); // Blowfish-алогритм шифрования

if ($conn) {
    $result = $conn -> query(
        "INSERT INTO accounts (login, passw, roleId, name) VALUES ('$login', '$hash', 2, '$name')");
    if ($result) {
        $json = [
            'status' => 'success',
            'message' => 'Регистрация прошла успешно!'
        ];
    }
    else {
        $json = [
            'status' => 'fail',
            'message' => 'Такой пользователь уже существует!'
        ];
    }
    $conn -> close();
}
$json = json_encode($json, JSON_UNESCAPED_UNICODE);
echo $json;