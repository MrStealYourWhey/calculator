const numbers = document.querySelectorAll('.number');
const numbers2 = document.querySelectorAll('.number');
const operands = document.querySelectorAll('.operand');
const equalSign = document.querySelector('#equal-sign');
const allClear = document.querySelector('#all-clear');
const deleteLast = document.querySelector('#delete');

let topDisplay = '';
let bottomDisplay = '';
let currentOperand = '';
let savedOperand = '';
let savedDisplay = '';
let operationCount = 0;

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (operationCount == 1 && topDisplay === ''){
            clearAll();
        }
        if ((number.innerHTML === '.' && bottomDisplay.includes('.')) || bottomDisplay.length > 10){
            return;
        }
        bottomDisplay += number.innerHTML;
        updateDisplay();
    });
});

function updateDisplay(){
    document.getElementById("bottom-display").innerHTML = bottomDisplay;
    document.getElementById("top-display").innerHTML = topDisplay + currentOperand;;
}

operands.forEach((operand) => {
    operand.addEventListener('click', () => {
        if (savedOperand !== ''){
            savedOperand = '';
            savedDisplay = '';
            operationCount = 0;
        }
        if ((bottomDisplay === '') || (topDisplay !== '' && bottomDisplay === '0')){
            if (topDisplay !== ''){
                currentOperand = operand.innerHTML;
                updateDisplay();
                return;
            }
            clearAll();
            return;
        }
        if (topDisplay === ''){
            topDisplay = bottomDisplay;
            bottomDisplay = '';
            currentOperand = operand.innerHTML;
            updateDisplay();
        } else {
            operate();
            topDisplay = bottomDisplay;
            bottomDisplay = '';
            currentOperand = operand.innerHTML;
            updateDisplay();
        }
    });
});

allClear.addEventListener('click', () => {
    clearAll()
});

deleteLast.addEventListener('click', () => {
    bottomDisplay = bottomDisplay.slice(0, -1);
    updateDisplay();
})

equalSign.addEventListener('click', () =>{
    operate();
});

function clearAll() {
    topDisplay = '';
    bottomDisplay = '';
    currentOperand = '';
    savedOperand = '';
    savedDisplay = '';
    operationCount = 0;
    updateDisplay();
}

function operate() {
    if (topDisplay === '' && savedDisplay === '' && savedOperand === '' || bottomDisplay === '' || bottomDisplay === 'Infinity'){
        return;
    }
    if (operationCount == 0){
        savedDisplay = bottomDisplay;
        if (currentOperand === '+'){
            bottomDisplay = parseFloat(topDisplay) + parseFloat(bottomDisplay);
        } else if (currentOperand === '-'){
            bottomDisplay = parseFloat(topDisplay) - parseFloat(bottomDisplay);
        } else if (currentOperand === '*'){
            bottomDisplay = Math.round(parseFloat(topDisplay) * parseFloat(bottomDisplay) * 10000) / 10000;
        } else if (currentOperand === '/'){
            if (bottomDisplay === '0'){
                clearAll();
                return;
            }
            bottomDisplay = Math.round(parseFloat(topDisplay) / parseFloat(bottomDisplay) * 10000) / 10000;
        } else if (currentOperand === '^'){
            bottomDisplay = Math.pow(parseFloat(topDisplay),parseFloat(bottomDisplay));
        }
        topDisplay = '';
        savedOperand = currentOperand;
        currentOperand = '';
        updateDisplay();
        operationCount = 1;
    } else {
            topDisplay = bottomDisplay;
            bottomDisplay = savedDisplay;
            currentOperand = savedOperand;
            savedOperand = '';
            updateDisplay();
            operationCount = 0;
            operate();
    }
}