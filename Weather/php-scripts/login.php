<?php
include 'db-connect.php';

// пытаемся защититься от инъекций как умеем
$login = htmlspecialchars($_POST['login']);
$password = htmlspecialchars($_POST['password']);

if ($conn) {
    $sql = "SELECT login, passw, accounts.name AS username, roles.name AS role 
            FROM accounts 
            INNER JOIN roles 
            ON roleId = roles.id 
            WHERE '$login' = login";
    $result = $conn -> query($sql);
    if ($result -> num_rows > 0) {
        while ($row = $result -> fetch_assoc()) {
            if (password_verify($password, $row['passw'])) {
                session_start();
                $_SESSION['auth'] = 'true';
                $_SESSION['username'] = $row['username'];
                $_SESSION['login'] = $row['login'];
                $_SESSION['password'] = $password;
                $_SESSION['role'] = $row['role'];
                $json = [
                    'status' => 'success',
                    'message' => 'Аккаунт найден!',
                    'role' => $row['role']
                ];
            }
            else {
                $json = [
                    'status' => 'fail',
                    'message' => 'Неверный пароль!',
                ];
            }
        }
    }
    else {
        $json = [
            'status' => 'fail',
            'message' => 'Пользователь не найден!'
        ];
    }
}

echo json_encode($json, JSON_UNESCAPED_UNICODE);
