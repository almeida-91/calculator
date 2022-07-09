function add(intA, intB){
    return +intA + +intB;
}

function subtract(intA, intB){
    return intA - intB;
}

function multiply(intA, intB){
    if (intB == "") intB = 1;
    return intA * intB;
}

function divide(intA, intB){    
    return intA / intB;
}

function power(intA, intB){
    if (intB == '') intB = 1;
    return intA ** intB;
}

function operate(operator, intA, intB){
    if (operator == '/' && intB == "") return divide(intA,1);
    if (operator == '/' && intB == 0) return "ERROR";
    initialValue = '';
    result = NaN;
    switch(operator){
        case `+`:
            return result = add(intA, intB);
        case `-`:
            return result = subtract(intA, intB);
        case `*`:
            return result = multiply(intA, intB);
        case `/`:
            return result = divide(intA, intB);
        case `^`:
            return result = power(intA, intB);
    }
}

const numberbuttons = document.getElementsByClassName(`number`);
const operators = document.getElementsByClassName(`operator`);
const display = document.getElementById(`display`);
const clearbutton = document.getElementById(`clear`);
const history = document.getElementById(`history`);
const equals = document.getElementById(`result`);
const decimal = document.getElementById(`decimal`);
let result = NaN;
let initialValue = '';
let operator = '';

for (i=0 ; i < numberbuttons.length; i++){
    numberbuttons[i].addEventListener(`click`, function(e){
        if(display.textContent == 'ERROR') clearDisplay();
        if(result == display.textContent){
            clear();
        }
        display.textContent += e.target.textContent;
    });
}

for (i=0 ; i < operators.length ; i++){
    operators[i].addEventListener(`click`, function(e){
        if (initialValue == '') initialValue = display.textContent;
        if (initialValue == 'ERROR') clearDisplay();
        if(operator == ''){
            operator = e.target.textContent;
            clear();
        } else if(result == display.textContent){
            operator = e.target.textContent;
            display.textContent = '';  
        } else getResult();
    });
};

clearDisplay();

clearbutton.addEventListener(`click`, clearDisplay);

function clearDisplay(){
    result = NaN;
    initialValue = '';
    operator = '';
    display.textContent = '';
}

function clear(){
    display.textContent = '';
    //history.textContent = '';
}

function hasOperator(string){
    string = string.split('');
    for(let i=0 ; i<string.length ; i++){
        if (string[i]== `+` || string[i] == '-' || string[i] == '*' || string[i] == '/' || string[i] == '^'){
            return string[i];
        }
    }
    return false;
}

equals.addEventListener(`click`, getResult);

function getResult(){
    if (initialValue == '') initialValue = display.textContent;
    console.log(initialValue);
    console.log(operator);
    console.log(display.textContent);
    if(display.textContent == 'ERROR'){
        clearDisplay();
        return;
    }
    if(operator == false && initialValue != ''){
        display.textContent = initialValue;
    } else if(operator == false && initialValue =='') {
        initialValue = display.textContent;
        clearDisplay();
    } else {
        display.textContent = operate(operator.toString(),initialValue,display.textContent);
        initialValue = '';
        result = display.textContent;
    }
}

function isDecimal(string){
    string = string.split('')
    for (i = 0 ; i<string.length ; i++){
        if (string[i] == '.') return true;
    }
    return false;
}

decimal.addEventListener(`click`, function (e){
    if(!isDecimal(display.textContent)){
        display.textContent += `.`;
    }       
})