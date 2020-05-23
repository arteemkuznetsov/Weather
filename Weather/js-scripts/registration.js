// отправление данных на сервер через Ajax в обход формы

function signUp(password1, password2) {
    let form = document.getElementById('form');
    let message = document.getElementById('message');
    if (password1 === password2) {
        fetch('php-scripts/user-registration.php', {
            method: 'POST',
            body: new FormData(form)
        })
            .then(response => {
                    if (response.status === 200) {
                        response.json().then(function (data) {
                            console.log(data);
                            if (data['message'] === 'Регистрация прошла успешно!') {
                                message.style.color = 'darkgreen';
                            }
                            else {
                                message.style.color = 'darkred';
                            }
                            message.innerText = data['message'];
                        });
                    } else {
                        console.log('Looks like there was a problem. ' +
                            'Status Code: ' + response.status);
                    }
                }
            )
            .catch(error => {
                console.error(error);
            });
    } else {
        message.style.color = 'darkred';
        message.innerText = 'Введенные пароли не совпадают!';
        message.classList.remove('shake');
        void message.offsetWidth; // вызываем перерисовку этого элемента для перезапуска анимации
        message.classList.add('shake');
    }
    return false;
}