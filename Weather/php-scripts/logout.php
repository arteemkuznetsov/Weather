<?php
session_start(); // выбирается текущая сессия
session_unset(); // удаляются все переменные сессии
session_destroy(); // сессия уничтожается

// после этого осуществляется переход к странице входа
// если попытаться перейти после этого через URL на user.phtml, оттуда перенаправит на страницу входа
header('Location: ../signin.html');
die();