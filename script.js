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
    memoryScreen.textContent = `${firstValue}${operator}${screen.textContent}=`;
    switch (operator) {
        case `x`: return x * y;
        case `/`: if (y == 0) {
                    return 'ERROR';
                  } else {
                    return x / y;
                  }
        case `+`: return Number(x) + Number(y);
        case `-`: return x - y;
    }
}

const memoryScreen = document.getElementById('screen-top');

// adds functionality for number buttons
const screen = document.getElementById('screen-bottom');
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(button => button.addEventListener('click', () => {
    //if an answer is on screen when a number is pressed the answer is cleared first
    if (displayingAnswer) {
        screen.textContent = '';
        displayingAnswer = false;
        operator = undefined;
    }
    //will only allow one decimal point
    if (button.textContent == "." && screen.textContent.includes(".")) {
        return;
    }
    // doesn't type anymore than 13 chars to prevent overflow
    if (screen.textContent.length < 13) {
        screen.textContent += button.textContent;
    }
}));


let displayingAnswer = false;

// adds functionality for clear button
const clearBtn = document.getElementById('clear-button');
clearBtn.addEventListener('click', () => {
    screen.textContent = '';
    memoryScreen.textContent = '';
    displayingAnswer = false;
    operator = undefined;
    firstValue = '';
});

//when an operator is pressed the number on screen + operator are logged and the screen is cleared
let firstValue;
let operator;
const operatorBtns = document.querySelectorAll('.operator-button');
operatorBtns.forEach(button => button.addEventListener('click', () => {
    if (operator === undefined) {
        operator = button.textContent;
        firstValue = screen.textContent;
        screen.textContent = '';
        displayingAnswer = false;
    } else {
        firstValue = operate(firstValue, operator, screen.textContent);
        operator = button.textContent;
        screen.textContent = '';
    }
    memoryScreen.textContent = firstValue + operator;
}));

const equalsBtn = document.getElementById('equals');
equalsBtn.addEventListener('click', () => {
    if (firstValue === undefined || firstValue == '') {
        if (screen.textContent == '') {
            screen.textContent = '0';
        }
    } else if (operator === undefined || screen.textContent == '') {
        screen.textContent = 'ERROR';
        memoryScreen.textContent = ``;
    } else {
        let answer = operate(firstValue, operator, screen.textContent);
        if (answer.toString().length < 13) {
            screen.textContent = answer;
        } else {
            screen.textContent = answer.toPrecision(8);
        }

    }
    displayingAnswer = true;
    operator = undefined;
});

const backspaceBtn = document.getElementById('backspace-button');
backspaceBtn.addEventListener('click', () => {
    if (screen.textContent !== "" && screen.textContent !== 'ERROR' && !displayingAnswer) {
        screen.textContent = screen.textContent.slice(0, -1);
    }
})

document.addEventListener('keydown', () => {
    
});