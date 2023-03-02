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
let inputtedNumber;
const screen = document.getElementById('screen');
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(button => button.addEventListener('click', () => {
    //will only allow one decimal point
    if (button.textContent == "." && screen.textContent.includes(".")) {
        return;
    }
    // doesn't type anymore than 13 chars to prevent overflow
    if (screen.textContent.length < 13) {
        screen.textContent += button.textContent;
        inputtedNumber = screen.textContent;
        console.log(inputtedNumber);
    }
}));

// adds functionality for clear button
const clearBtn = document.getElementById('clear-button');
clearBtn.addEventListener('click', () => screen.textContent = '');