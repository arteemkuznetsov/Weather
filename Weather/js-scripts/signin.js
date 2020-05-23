function signIn() {
    let form = document.getElementById('form');
    let message = document.getElementById('message');
    fetch('php-scripts/login.php', {
        method: 'POST',
        body: new FormData(form)
    })
        .then(response => {
                if (response.status === 200) {
                    console.log('Successful. Status Code: ' + response.status);
                    response.json().then(function (data) {
                        console.log(data);
                        if (data['status'] !== 'fail') {
                            switch (data['role']) {
                                case 'user':
                                    document.location.href = 'user.phtml';
                                    break;
                                case 'admin':
                                    document.location.href = 'admin.phtml';
                                    break;
                            }
                        } else {
                            message.innerText = data['message'];
                            message.classList.remove('shake');
                            void message.offsetWidth; // вызываем перерисовку этого элемента для перезапуска анимации
                            message.classList.add('shake');
                        }
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

    return false;
}