function deleteUser() {
    let input = document.getElementById('user').value;
    let popup = document.getElementsByClassName('popuptext')[0];
    if (input !== document.getElementById('my-login').innerText &&
        input !== '1' &&
        input !== 'admin') { // самого себя удалить нельзя, как и пользователя admin с id=1
        let isText = isNaN(Number(input)); // вся строка - это число?
        switch (isText) {
            case true: // логин
                fetchScriptDeleteBy('login', input, popup);
                break;
            case false: // id
                fetchScriptDeleteBy('id', input, popup);
                break;
            default:
                alert('Ошибка!');
        }
        popup.classList.remove('show');
        void popup.offsetWidth; // вызываем перерисовку этого элемента для перезапуска анимации
        popup.classList.add('show');
    } else {
        popup.innerText = 'Пользователя удалить нельзя!'
        popup.style.backgroundColor = 'darkred';
        popup.classList.remove('show');
        void popup.offsetWidth; // вызываем перерисовку этого элемента для перезапуска анимации
        popup.classList.add('show');
    }
}

function fetchScriptDeleteBy(deleteParam, input, popup) {
    fetch('php-scripts/delete-user-by-' + deleteParam + '.php?login=' + input)
        .then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    console.log(data);
                    if (data['status'] === 'success') {
                        popup.style.backgroundColor = 'darkgreen';
                    } else {
                        popup.style.backgroundColor = 'darkred';
                    }
                    popup.innerText = data['message'];
                })
            }
        })
}