function changePassword(password1, password2) {
    if (password1 === password2) {
        let myLogin = document.getElementById('my-login').innerText;
        let formData = new FormData();
        formData.append('password', password1);
        formData.append('login', myLogin);
        fetch('php-scripts/change-password.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        console.log(data);
                        if (data['status'] === 'success') {
                            document.getElementById('my-password').innerText = data['new_password'];
                        } else {
                            alert('Ошибка!');
                        }
                    })
                } else {
                    console.log('Looks like there was a problem. ' +
                        'Status Code: ' + response.status);
                }
            })
            .catch(error => console.log(error));
    } else {
        alert('Пароли не совпадают!');
    }
    return false;
}

function changeName() {
    let name = document.getElementById('name').value;
    let myLogin = document.getElementById('my-login').innerText;
    let formData = new FormData();
    formData.append('name', name);
    formData.append('login', myLogin);
    fetch('php-scripts/change-name.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    console.log(data);
                    if (data['status'] === 'success') {
                        document.getElementById('welcome-phrase').innerText = 'Добро пожаловать, ' + data['new_name'] + '!';
                    } else {
                        alert('Ошибка!');
                    }
                })
            } else {
                console.log('Looks like there was a problem. ' +
                    'Status Code: ' + response.status);
            }
        })
        .catch(error => console.log(error));
    return false;
}