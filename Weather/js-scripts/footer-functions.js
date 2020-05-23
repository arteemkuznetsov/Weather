function changeIconToBlue(name, element) {
    element.style.borderColor = '#5d9feb'; // изменяем цвет бордера на синий
    element.children[0].src = `pic/social/${name}-blue.svg`; // и первого потомка (img) на его синий вариант
}

function changeIconToBlack(name, element) {
    element.style.borderColor = 'black';
    element.children[0].src = `pic/social/${name}.svg`
}