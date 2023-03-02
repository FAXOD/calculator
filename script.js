function add(x, y) {
    return x + y;
}

function subtract(x,y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, operator, y) {
    switch (operator) {
        case `*`: return x * y;
        case `/`: return x / y;
        case `+`: return x + y;
        case `-`: return x - y;
    }
}

// adds functionality for number buttons
const screen = document.getElementById('screen');
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(button => {
    button.addEventListener('click', () => screen.textContent += button.textContent);
});