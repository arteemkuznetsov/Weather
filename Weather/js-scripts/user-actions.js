function sendMessage() {
    let myLogin = document.getElementById('my-login').innerText;
    let formData = new FormData(document.getElementById('feedback'));
    formData.append('login', myLogin);
    console.log(formData);
    fetch('php-scripts/send-message.php', {
        method: 'POST',
        body: formData
    })
        .then(response => console.log(response.status))
        .catch(error => console.log(error));
}