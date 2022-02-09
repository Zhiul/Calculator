let actualValue = '';
let previusValue = '';
let operatorSymbol = '';
let maxNumberLength = false;

const numberButtons = document.querySelectorAll('.number-btn');
const paraActualNumber = document.querySelector('#actual-number');
const paraPreviusValue = document.querySelector('#previus-number')

const deleteButton = document.querySelector('#delete-btn');
const sumButton = document.querySelector('#sum-btn');
const subtractButton = document.querySelector('#subtract-btn');
const multiplyButton = document.querySelector('#multiply-btn');
const divideButton = document.querySelector('#divide-btn');
const equalButton = document.querySelector('#equal-btn');
const dotButton = document.querySelector('#dot-button')

const operators = document.querySelectorAll('.operator');


let operator;
let previusOperator;
let styleElem = document.head.appendChild(document.createElement("style"));
let clearButton = document.querySelector('#clear-btn');
const percentageButton = document.querySelector('#percentage-btn');

window.addEventListener('keydown', function(e){
    switch(e.key){
        case '+':
            changeValues();
            operatorSymbol = '+';
            updateActualValues();
            setOperatorToSum();
            break;

        case '-':
            changeValues();
            operatorSymbol = '-';
            updateActualValues();
            setOperatorToSubstract();
            break;
        
        case '*':
            changeValues();
            operatorSymbol = 'x';
            updateActualValues();
            setOperatorToMultiply();
            break;

        case '/':
            changeValues();
            operatorSymbol = '÷';
            updateActualValues();
            setOperatorToDivide();
            break;

        case 'Backspace':
             deleteNumber();
            break;

        case '.':
            insertDot();
            break;

        case 'Enter':
            equal();
            break;

        case '1':
            enterNumber(1);
            break;

        case '2':
            enterNumber(2);
            break;

        case '3':
            enterNumber(3);
            break;

        case '4':
            enterNumber(4);
            break;

        case '5':
            enterNumber(5);
            break;

        case '6':
            enterNumber(6);
            break;

        case '7':
            enterNumber(7);
            break;

        case '8':
            enterNumber(8);
            break;
        case '9':
            enterNumber(9);
            break;

        case '0':
            enterNumber(0);
            break;
    }
});

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function updateActualValues(){
    actualValue = actualValue.toString();
    if(actualValue.length > 11){
        actualValue = parseFloat(actualValue).toExponential(6);
    } 
    paraActualNumber.textContent = actualValue;
    paraPreviusValue.textContent = previusValue;
    if(previusValue !== ''){
        styleElem.innerHTML = `#previus-number:after {content: ' ${operatorSymbol}';}`;
    } else{
        styleElem.innerHTML = `#previus-number:after {content: '';}`
    }
    checkMaxNumberLength();
}

function checkMaxNumberLength(){
    if(paraActualNumber.textContent.length >= 11){
        maxNumberLength = true;
    } else{
        maxNumberLength = false;
    }
}

clearButton.addEventListener('click', () =>{
    actualValue = '';
    previusValue = '';
    updateActualValues();
})

deleteButton.addEventListener('click', deleteNumber)

function deleteNumber(){
    if(actualValue != 'Infinity' && actualValue != ''){
        paraActualNumber.textContent = paraActualNumber.textContent.slice(0, -1);
        actualValue = actualValue.toString();
        actualValue = actualValue.slice(0, -1);
        checkMaxNumberLength();
    } else if(actualValue === ''){
        actualValue = previusValue;
        previusValue = '';
        operatorSymbol = '';
        updateActualValues();
    } else{
        paraActualNumber.textContent = paraActualNumber.textContent = '';
        actualValue = '';
    }

    if(maxNumberLength === false){
        addNumbersButtonsListener()
    }
}

dotButton.addEventListener('click', insertDot);


function insertDot(){
    if(actualValue.includes('.') === false && maxNumberLength === false){
        actualValue += '.';
        updateActualValues();
    }
}

equalButton.addEventListener('click', equal);

function equal(){
    if(actualValue !== '' && previusValue !== ''){
        operatorSymbol = '';
        actualValue = +(operator(parseFloat(previusValue), parseFloat(actualValue)).toFixed(2));
        previusValue = '';
        updateActualValues();
    } else if(actualValue === '' && previusValue !== ''){
        actualValue = previusValue;
        previusValue = '';
        updateActualValues();
    } else if(actualValue !== '' && previusValue === ''){
        shakeError();
    }
}

operators.forEach(operatorBtn =>{
    operatorBtn.addEventListener('click', () =>{
        changeValues();
        setOperatorSymbol(operatorBtn);
        updateActualValues();
    })
})

function changeValues(){
    previusOperator = operator;
    if(previusValue === '' && actualValue != ''){
        previusValue = actualValue.replace(/\.$/, "");
        actualValue = '';
    } else if(previusValue != '' && actualValue != ''){
        previusValue = +(previusOperator(parseFloat(previusValue), parseFloat(actualValue))).toFixed(2);
        actualValue = '';
    } else if(previusValue === 0 && actualValue != ''){
        previusValue = +(previusOperator(parseFloat(previusValue), parseFloat(actualValue))).toFixed(2);
        actualValue = '';
    }
}

function setOperatorSymbol(operator){
    if(actualValue === ''){
        operatorSymbol = operator.textContent;
    }
}

numberButtons.forEach(numberButton =>{
    numberButton.addEventListener('click', enterNumber)
})

function enterNumber(number = ''){
    if (maxNumberLength === false && actualValue.slice(0, 2) != '0.') {
        actualValue = actualValue.replace(/^0+/, "");
        if(this.textContent === undefined){
            actualValue += number;
        } else{
            actualValue += this.textContent;
        }
    } else if(maxNumberLength === true){
        numberButtons.forEach(numberButton =>{
            numberButton.removeEventListener('click', enterNumber)
        })
    } else{
        if(this.textContent === undefined){
            actualValue += number;
        } else{
            actualValue += this.textContent;
        }
    }
    checkMaxNumberLength();
    updateActualValues();
}

sumButton.addEventListener('click', setOperatorToSum);

function setOperatorToSum(){
    operator = add;
    addNumbersButtonsListener()
}

subtractButton.addEventListener('click', setOperatorToSubstract);

function setOperatorToSubstract(){
    operator = subtract;
    addNumbersButtonsListener()
}

multiplyButton.addEventListener('click', setOperatorToMultiply)

function setOperatorToMultiply(){
    operator = multiply;
    addNumbersButtonsListener()
}

divideButton.addEventListener('click', setOperatorToDivide)

function setOperatorToDivide(){
    operator = divide;
    addNumbersButtonsListener();
}

function addNumbersButtonsListener(){
    numberButtons.forEach(numberButton =>{
        numberButton.addEventListener('click', enterNumber)
    })
}

function shakeError(){
    paraActualNumber.classList.add('shake');
    paraPreviusValue.classList.add('shake');
    setTimeout(() =>{
        paraActualNumber.classList.remove('shake');
        paraPreviusValue.classList.remove('shake');  
    }, 500);
}







