<?php
$json = json_decode($_POST['json']);
$type = $_POST['type'];

file_put_contents("../json/$type.json", json_encode($json, JSON_UNESCAPED_UNICODE));
