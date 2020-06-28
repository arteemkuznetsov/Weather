<?php
// подсказки при вводе
include 'db-connect.php';

$json = [];
$input = $_GET['input'];

if ($conn) {
    // выдает не более 10 городов, названия которых начинаются с введенных символов
    // города отсортированы по увеличению длины названий
    // наиболее точное предыдугадывание города какое можно сделать без пометки "известный город" в таблице
    $sql = "SELECT * FROM 
            (SELECT name FROM cities 
            WHERE name LIKE '$input%' LIMIT 10) subquery 
            ORDER BY CHAR_LENGTH(subquery.name) DESC";
    $result = $conn -> query($sql);
    if ($result -> num_rows > 0) {
        while ($row = $result -> fetch_assoc()) {
            $json[] = $row['name'];
        }
    }
}

echo json_encode($json, JSON_UNESCAPED_UNICODE);
