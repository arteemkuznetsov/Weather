<?php
// админа можно зарегистрировать только через php скрипт, доступ к которому можно получить только на сервере
include 'db-connect.php';

$name = '';
$login = '';
$password = '';

$hash = password_hash($password, PASSWORD_BCRYPT); // Blowfish-алогритм шифрования

if ($conn) {
    $result = $conn -> query(
        "INSERT INTO accounts (login, passw, roleId, name) VALUES ('$login', '$hash', 1, '$name')");
    if ($result -> num_rows > 0) {
        echo 'Аккаунт администратора успешно зарегистрирован!';
    }
    else {
        echo 'Такой пользователь уже существует!';
    }
    $conn -> close();
}
