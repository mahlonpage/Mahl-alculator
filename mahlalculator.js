let value = 0; //Current value
let store = 0; //Current stored value
let currOp = null; //Current operation waiting to be performed
let display = document.querySelector('#display');

// Resets the calculator to it's initial state.
function clear()    {
    value = 0;
    store = 0;
    currOp = null;
    display.textContent = value.toString();
}

// Inverts the sign of the calculator
function invertSign() {
    //If max length hit, do nothing.
    let length = value.toString().length;
    if (length >= 9) return;

    value = value * -1;
    display.textContent = value.toString();
}

//Converts from percentage to decimal.
function fromPercent()    {
    //If minimum value below .0001, set to zero.
    if (value < 0.0001) value = 0;
    else value = value / 100;
    value = overflowProtect(value);
    display.textContent = value.toString();
}

//Adds a decimal if there is room.
function decimal()  {
    let text = value.toString();
    if (text.length >= 9) return;
    if (text.includes('.')) return;

    text = text.concat('.');
    value = Number(text);
    console.log(value);
    display.textContent = text;
}

//Adds a number when clicked to the end of the current value.
function clickNum(number) {
    //When doing an operation, allows for previous number to stay on display.
    let text;
    if (currOp != null) text = value.toString();
    else text = display.textContent;

    //If at max length, do nothing.
    if (text.length >= 9) return;

    if (text === "0") text = number;
    else text = text.concat(number);
    value = Number(text);
    display.textContent = text;
}

//Performs an operation when button is pressed.
function operation(op)    {
    //If an operation is stored, calculate it
    if (currOp != null) calculate();

    //Store the current value and operation.
    currOp = op;
    store = value;
    value = 0;
}

//Calculates the value given an operation.
function calculate()    {
    switch (currOp) {
        case 'divide':
            value = store / value;
            break;
        case 'multiply':
            value = store * value;
            break;
        case 'subtract':
            value = store - value;
            break;
        default:
            value = store + value;
            break;
    }
    store = 0;
    currOp = null;

    value = overflowProtect(value);
    display.textContent = value.toString();
}

//Protects the calculator from overflowing past 9 characters.
function overflowProtect(myVal) {
    let text = myVal.toString();
    if (text.length <= 9) return Number(text);

    let decimalLoc = text.indexOf('.');
    if (decimalLoc === -1 || decimalLoc > 8)    {
        return 999999999
    } else {
        return text.slice(0, 9);
    }
}


//Adds handlers for all the buttons on the calculators.
function addHandlers()  {
    let clearBtn = document.querySelector('#clear');
    let negBtn = document.querySelector('#neg');
    let percentBtn = document.querySelector('#percent');
    let divideBtn = document.querySelector('#divide');
    let multiplyBtn = document.querySelector('#multiply');
    let subtractBtn = document.querySelector('#subtract');
    let addBtn = document.querySelector('#add');
    let equalBtn = document.querySelector('#equals');
    let decimalBtn = document.querySelector('#decimal');
    let zeroBtn = document.querySelector('#zero');
    let oneBtn = document.querySelector('#one');
    let twoBtn = document.querySelector('#two');
    let threeBtn = document.querySelector('#three');
    let fourBtn = document.querySelector('#four');
    let fiveBtn = document.querySelector('#five');
    let sixBtn = document.querySelector('#six');
    let sevenBtn = document.querySelector('#seven');
    let eightBtn = document.querySelector('#eight');
    let nineBtn = document.querySelector('#nine');

    clearBtn.addEventListener('click', () => { clear(); });
    negBtn.addEventListener('click', () => { invertSign(); });
    percentBtn.addEventListener('click', () => { fromPercent(); });
    divideBtn.addEventListener('click', () => { operation('divide'); });
    multiplyBtn.addEventListener('click', () => { operation('multiply'); });
    subtractBtn.addEventListener('click', () => { operation('subtract'); });
    addBtn.addEventListener('click', () => { operation('add'); });
    equalBtn.addEventListener('click', () => { calculate(); });
    decimalBtn.addEventListener('click', () => { decimal(); });
    zeroBtn.addEventListener('click', () => { clickNum('0'); });
    oneBtn.addEventListener('click', () => { clickNum('1'); });
    twoBtn.addEventListener('click', () => { clickNum('2'); });
    threeBtn.addEventListener('click', () => { clickNum('3'); });
    fourBtn.addEventListener('click', () => { clickNum('4'); });
    fiveBtn.addEventListener('click', () => { clickNum('5'); });
    sixBtn.addEventListener('click', () => { clickNum('6'); });
    sevenBtn.addEventListener('click', () => { clickNum('7'); });
    eightBtn.addEventListener('click', () => { clickNum('8'); });
    nineBtn.addEventListener('click', () => { clickNum('9'); });
}

addHandlers();
clear();