<?php
session_start();

// если не стоит соответствующая пометка в текущей сессии (т.е. сессии вообще нет),
// то перебрасываем на страницу входа
// также пользователь не может перейти на страницу админа простой сменой URL
if (!$_SESSION['auth'] || $_SESSION['role'] != 'user') {
    header('Location: signin.html');
    die();
}

$username = $_SESSION['username'];
$login = $_SESSION['login'];
$password = $_SESSION['password'];
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Weather Info Portal – Личный кабинет</title>
    <link href="css/account.css" rel="stylesheet">
    <link href="css/footer.css" rel="stylesheet">
    <script src="js-scripts/user-actions.js"></script>
    <script src="js-scripts/change-account-data.js"></script>
    <script src="js-scripts/footer-functions.js"></script>
    <link href="pic/logo.png" rel="icon" type="image/icon">
</head>
<body>
<div class="container">
    <header class="welcome">
        <p class="header-phrase" id="welcome-phrase">Добро пожаловать, <?php echo $username ?>!</p>
    </header>
    <table class="table-form">
        <tr>
            <td>
                <div>
                    <table>
                        <tr>
                            <td>
                                <span class="row-name">Логин: </span>
                            </td>
                            <td>
                                <span id="my-login"><?php echo $login ?></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="row-name">Пароль: </span>
                            </td>
                            <td>
                                <span id="my-password"><?php echo $password ?></span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td class="logout">
                <div>
                    <a href="php-scripts/logout.php">
                        <input type="image" src="pic/login/logout.svg" alt="Выйти">
                    </a>
                </div>
            </td>
        </tr>
    </table>
    <section style="display: flex; justify-content: space-between" class="block">
        <form onsubmit="
        return changePassword(
            document.getElementById('password').value,
            document.getElementById('password-repeat').value)">
            <table class="table-form">
                <tr>
                    <td>
                        <div>
                            <table class="table-change-password">
                                <tr>
                                    <td>
                                        <span style="font-weight: 600">Изменить пароль</span>
                                    </td>
                                </tr>

                                <tr class="custom-row">
                                    <td>
                                        <span class="row-name">Новый пароль:</span>
                                    </td>
                                    <td>
                                        <input required type="password" id="password" placeholder="••••••••••"
                                               pattern="[0-9a-zA-Z]{5,30}"
                                               title="Пароль должен содержать от 5 до 30 символов (допускаются цифры, прописные и строчные латинские буквы)">
                                    </td>
                                </tr>
                                <tr class="custom-row">
                                    <td>
                                        <span class="row-name">Подтвердите пароль:</span>
                                    </td>
                                    <td>
                                        <input required type="password" id="password-repeat" placeholder="••••••••••"
                                               pattern="[0-9a-zA-Z]{5,30}"
                                               title="Пароль должен содержать от 5 до 30 символов (допускаются цифры, прописные и строчные латинские буквы)">
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center">
                                        <button type="submit">Изменить
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </form>
        <form onsubmit="return changeName()">
            <table class="table-form">
                <tr>
                    <td>
                        <div>
                            <table class="table-change">
                                <tr>
                                    <td>
                                        <span style="font-weight: 600">Изменить имя</span>
                                    </td>
                                </tr>
                                <tr class="custom-row">
                                    <td>
                                        <span class="row-name">Новое имя:</span>
                                    </td>
                                    <td>
                                        <input required type="text" id="name" pattern="[a-zA-Zа-яА-Я]{1,50}">
                                    </td>
                                </tr>
                                <tr class="custom-row">
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center">
                                        <button type="submit">Изменить</button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </form>
    </section>
    <section class="feedback-section">
        <div class="block" style="padding: 10px; margin-top: 15px">
            <header class="feedback-header">
                <span>Есть предложения или жалобы на работу сайта? Используйте форму обратной связи.</span>
            </header>
            <div class="feedback-form-container">
                <form onsubmit="sendMessage()" id="feedback" method="post">
                    <div>
                        <textarea required minlength="5" maxlength="150" cols="30" rows="6" name="message"
                                  placeholder="Не более 150 символов"></textarea>
                    </div>
                    <div>
                        <button type="submit">Отправить</button>
                    </div>
                </form>
            </div>
    </section>
    <div class="to-main-page">
        <a href="index.html" class="a-custom">
            <strong class="footer-link">Перейти на главную</strong>
        </a>
    </div>
</div>
</div>
<footer>
    <div class="footer-content">
        <section class="footer-row-1">
            <div class="footer-row-1-logos">
                <a href="https://weather.com/" target="_blank">
                    <img alt="The Weather Channel" class="footer-logo" src="pic/footer%20logo/the-weather-channel.png"
                         style="height: 60px">
                </a>
                <a href="https://openweathermap.org/" target="_blank">
                    <img alt="OpenWeather" class="footer-logo" src="pic/footer%20logo/openweather.png">
                </a>
                <a href="https://www.mapbox.com/" target="_blank">
                    <img alt="Mapbox" class="footer-logo" src="pic/footer%20logo/mapbox.png">
                </a>
            </div>
            <section class="footer-row-1-social">
                <h2 class="footer-row-1-header">Свяжитесь с нами</h2>
                <div class="social-icons-block">
                    <a href="https://github.com/arteemkuznetsov" target="_blank">
                        <div class="social-img-circle"
                             onmouseout="changeIconToBlack('github', this)"
                             onmouseover="changeIconToBlue('github', this)"
                             title="Познакомьтесь с другими проектами на GitHub">
                            <img alt="Github" class="social-img" id="social-1" src="pic/social/github.svg">
                        </div>
                    </a>
                    <a href="https://vk.com/arteemkuznetsov" target="_blank">
                        <div class="social-img-circle"
                             onmouseout="changeIconToBlack('vk', this)"
                             onmouseover="changeIconToBlue('vk', this)"
                             title="Подпишитесь в VK">
                            <img alt="VK" class="social-img" id="social-2" src="pic/social/vk.svg">
                        </div>
                    </a>
                    <a href="https://www.instagram.com/arteemkuznetsov/" target="_blank">
                        <div class="social-img-circle"
                             onmouseout="changeIconToBlack('instagram', this)"
                             onmouseover="changeIconToBlue('instagram', this)"
                             title="Следите за новостями в Instagram">
                            <img alt="Instagram" class="social-img" id="social-3" src="pic/social/instagram.svg">
                        </div>
                    </a>
                </div>
            </section>
        </section>
        <section class="footer-row-2">
            <div class="footer-links-list">
                <a href="mailto:arteemkuznetsov@gmail.com?subject=Отзыв о сервисе Weather Forecast" class="a-custom">
                    <strong class="footer-link">Отзыв</strong>
                </a>
                <a href="https://openweathermap.org/api" class="a-custom">
                    <strong class="footer-link">Weather API</strong>
                </a>
            </div>
        </section>
        <section class="footer-row-3">
            <div>
                <p class="privacy">Дизайн сайта вдохновлен The Weather Channel. Проект был разработан исключительно в
                    образовательных целях.</p>
            </div>
        </section>
        <section class="footer-row-4">
            <div>2020</div>
        </section>
    </div>
</footer>
</body>
</html>
