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

// calculates the given sum
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

// adds event listeners for numbers and grabs screen element
const screen = document.getElementById('screen-bottom');
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(button => button.addEventListener('click', numberOperation));

// enters numbers when buttons are pressed
function numberOperation(e) {
    //if an answer is on screen when a number is pressed the answer is cleared first
    if (displayingAnswer) {
        screen.textContent = '';
        displayingAnswer = false;
        operator = undefined;
    }
    
    switch (e.type) {
        case "click":
            if (this.textContent == "." && screen.textContent.includes(".")) {
                return;
            }
            if (screen.textContent.length < 13) {
                screen.textContent += this.textContent;
            }
            break;
        case "keydown":
            if (e.key == "." && screen.textContent.includes(".")) {
                return;
            }
            if (screen.textContent.length < 13) {
                screen.textContent += e.key;
            }
            break;
    }
};

let displayingAnswer = false;

// adds listener for clear button
const clearBtn = document.getElementById('clear-button');
clearBtn.addEventListener('click', clearOperation);

// clears the screen
function clearOperation() {
    screen.textContent = '';
    memoryScreen.textContent = '';
    displayingAnswer = false;
    operator = undefined;
    firstValue = '';
};

// adds event listener for operator buttons
let firstValue;
let operator;
const operatorBtns = document.querySelectorAll('.operator-button');
operatorBtns.forEach(button => button.addEventListener('click', operatorOperation));

// allows operator buttons to be used
function operatorOperation(e) {
    switch (e.type) {
        case "click":
            if (operator === undefined) {
                operator = this.textContent;
                firstValue = screen.textContent;
                screen.textContent = '';
                displayingAnswer = false;
            } else {
                firstValue = operate(firstValue, operator, screen.textContent);
                operator = this.textContent;
                screen.textContent = '';
            }
            break;
        case "keydown":
            if (operator === undefined) {
                operator = e.key;
                if (operator == "*") {
                    operator = "x";
                }
                firstValue = screen.textContent;
                screen.textContent = '';
                displayingAnswer = false;
            } else {
                firstValue = operate(firstValue, operator, screen.textContent);
                operator = e.key;
                screen.textContent = '';
            }
    }
    memoryScreen.textContent = firstValue + operator;
};

// adds event listener for equals button
const equalsBtn = document.getElementById('equals');
equalsBtn.addEventListener('click', equalsOperation);

// adds functionality for equals button
function equalsOperation() {
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
};

const backspaceBtn = document.getElementById('backspace-button');
backspaceBtn.addEventListener('click', backspaceOperation);

function backspaceOperation() {
    if (screen.textContent !== "" && screen.textContent !== 'ERROR' && !displayingAnswer) {
        screen.textContent = screen.textContent.slice(0, -1);
    }
};

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".": 
            numberOperation(e);
            break;
        case "+":
        case "-":
        case "*":
        case "/": 
            operatorOperation(e);
            break;
        case "Enter":
        case "=":
            equalsOperation();
            break;
        case "Backspace":
            backspaceOperation();
            break;
        case "Escape":
            clearOperation();
            break;
    }
});