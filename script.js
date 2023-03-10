// creates functions for basic mathematical operations
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

// calculates the given sum based on the operator given
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

// adds event listeners for numbers and grabs screen element
const memoryScreen = document.getElementById('screen-top');
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

// creates variables to be used
let firstValue; //stored the screen text when an operator is pressed
let displayingAnswer = false; // allows chained operations and prevents editing the answer on screen

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
let operator;
const operatorBtns = document.querySelectorAll('.operator-button');
operatorBtns.forEach(button => button.addEventListener('click', operatorOperation));

// allows operator buttons to be used
function operatorOperation(e) {
    switch (e.type) {
        case "click":
            if (this.textContent == "-" && screen.textContent == "") {
                screen.textContent += "-";
                return;
            }
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
            if (e.key == "-" && screen.textContent == "") {
                screen.textContent += "-";
                return;
            }
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

// adds event listener to backspace button
const backspaceBtn = document.getElementById('backspace-button');
backspaceBtn.addEventListener('click', backspaceOperation);

// adds functionality for backspace button
function backspaceOperation() {
    if (screen.textContent !== "" && screen.textContent !== 'ERROR' && !displayingAnswer) {
        screen.textContent = screen.textContent.slice(0, -1);
    }
};

// adds event listener to allow for keyboard inputs
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