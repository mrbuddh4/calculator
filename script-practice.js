let initValue = 100;
let operator = '/';
let currentValue = 3;

/////////////////////
function inputOperand(operand) {
    if(firstOperator === null) {
        if(displayValue === '0') {
            displayValue = operand;
            firstOperand = displayValue;
        } else {
            displayValue += operand;
            firstOperand = displayValue;
        }
    } else if(result != null) {
        //inputOperand after inputEquals begins new operation
        if(displayValue === result) {
            result = null;
            firstOperator = null;
            displayValue = operand;
            firstOperand = displayValue;
        } else {
            displayValue = displayValue + operand;
            firstOperand = displayValue; 
        }                 
    } else {
        //console.log(displayValue, firstOperand)
        if(displayValue === firstOperand) {
            displayValue = operand;
            secondOperand = displayValue;
            console.log(displayValue, firstOperator, secondOperator, secondOperand)
        } else {
            displayValue += operand;
            secondOperand = displayValue;
        }
    }
}

function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        secondOperator = operator;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = result;
        firstOperand = displayValue;
        secondOperand = null;
        result = null;
        console.log(displayValue, firstOperand)
        
    } else if(firstOperator != null && secondOperator != null) {
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        displayValue = result;
        firstOperand = displayValue;
        result = null;
        //firstOperator = secondOperator;
        console.log()
    } else { 
        firstOperator = operator;
        //console.log(firstOperator);
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
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        displayValue = result;
    } else {
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = result;
    }
}
/////////////////////
let result = operate(initValue, currentValue, operator);
console.log(result);