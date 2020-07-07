let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
let decimal = false;
const buttons = document.querySelectorAll('button');

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
}
  
updateDisplay();

function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                inputEquals();
                updateDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                updateDisplay();
        }
    )}
}

clickButton();

function inputOperand(operand) {
    if(firstOperator === null) {
        //1st click - handles first operand input
        if(displayValue === '0') {
            displayValue = operand;
            firstOperand = displayValue;
        } else {
            displayValue += operand;
            firstOperand = displayValue;
            console.log(firstOperand);
        }
    } else if(result != null) {
        //inputOperand() after inputEquals() begins new operation
        if(displayValue === result) {
            result = null;
            firstOperator = null;
            displayValue = operand;
            firstOperand = displayValue;
        } else {
            displayValue += operand;
            firstOperand = displayValue; 
        }                 
    } else {
        //3rd/5th click - inputs to secondOperand
        console.log(firstOperand)
        if(displayValue === firstOperand) {
            displayValue = operand;
            secondOperand = displayValue;
        } else {
            displayValue += operand;
            secondOperand = displayValue;
        }
    }
}

function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        //4th click - handles input of second operator
        secondOperator = operator;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = result;
        firstOperand = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        //6th click - new secondOperator
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = result;
        firstOperand = displayValue;
        result = null;
    } else { 
        //2nd click - handles first operator input
        firstOperator = operator;
    }
}

function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if(firstOperator === null) {
        displayValue = firstOperand;
        if(firstOperand === null) {
            displayValue = '0';
        }
     } else if(secondOperator != null) {
        //handles final result
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        displayValue = result; 
    } else {
        //handles first operation
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = result;
    }
}

function inputDecimal(dot) {
    //after inputOperator() hitting decimal will display '0.' and then inputOperand()
    if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function inputPercent(num) {
    if(num === firstOperand) {
        displayValue = firstOperand/100;
        firstOperand = displayValue;
    } if(num === secondOperand) {
        displayValue = secondOperand/100;
        secondOperand = displayValue;
    }
}

function inputSign(num) {
    if(num === firstOperand) {
        displayValue = firstOperand * -1;
        firstOperand = displayValue;
    } if(num === secondOperand) {
        displayValue = secondOperand * -1;
        secondOperand = displayValue;
    }
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputBackspace() {
    if(firstOperand != null) {
        firstOperand = null;
        updateDisplay();
    }
}

function operate(x, y, op) {
    if(op === '+') {
        return x + y;
    } else if(op === '-') {
        return x - y;
    } else if(op === '*') {
        return x * y;
    } else if(op === '/') {
        if(y === 0) {
            return 'lmao';
        } else {
        return x / y;
        }
    }
}

/* 
xstring together multiple operations / inputOperator() assigns result to firstOperand?
xfix percent and sign concatenating the next operands after you press them
-limit display string to 13
-make inputDecimal() imply 0
-keyboard support
-add backspace?
*/