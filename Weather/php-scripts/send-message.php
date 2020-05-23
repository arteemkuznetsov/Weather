<?php
include 'db-connect.php';

$json = [];

$message = htmlspecialchars($_POST['message']);
$login = $_POST['login'];

if ($conn) {
    $conn -> query(
        "INSERT INTO feedback (message, login, date_time) VALUES 
                ('$message', '$login', now())");
    $result = $conn -> query("SELECT * FROM feedback");
    if ($result -> num_rows > 0) {
        while ($row = $result -> fetch_assoc()) {
            $json[] = array(
                'message' => $row['message'],
                'sender' => $row['login'],
                'datetime' => $row['date_time']
            );
        }
    }
    $conn -> close();
}

file_put_contents("../json/feedback.json", json_encode($json, JSON_UNESCAPED_UNICODE));
