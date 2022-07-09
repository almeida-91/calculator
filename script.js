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
    switch(operator){
        case `+`:
            return add(intA, intB);
        case `-`:
            return subtract(intA, intB);
        case `*`:
            return multiply(intA, intB);
        case `/`:
            return divide(intA, intB);
        case `^`:
            return power(intA, intB);
    }
}

const numberbuttons = document.getElementsByClassName(`number`);
const operators = document.getElementsByClassName(`operator`);
const display = document.getElementById(`display`);
const clearbutton = document.getElementById(`clear`);
const history = document.getElementById(`history`);
const equals = document.getElementById(`result`);
const decimal = document.getElementById(`decimal`);

for (i=0 ; i < numberbuttons.length; i++){
    numberbuttons[i].addEventListener(`click`, function(e){
        if(display.textContent == 'ERROR') clear();
        display.textContent += e.target.textContent;
    });
}

for (i=0 ; i < operators.length ; i++){
    operators[i].addEventListener(`click`, function(e){
        let operator = hasOperator(history.textContent);
        if(operator == false && history.textContent != ''){
            history.textContent += e.target.textContent; 
            clearDisplay();
        }
        else if(operator == false){
            if(display.textContent == 'ERROR') clearDisplay();
            history.textContent += display.textContent + e.target.textContent;
        } else {
            if(display.textContent == 'ERROR') clearDisplay();
            let intA = history.textContent.slice(0,-1);
            let intB = display.textContent;
            display.textContent = operate(operator.toString(),intA,intB);
            history.textContent = '';
            history.textContent += display.textContent+e.target.textContent;
        }
        clearDisplay();
    })
}

clear();

clearbutton.addEventListener(`click`, clear);

function clearDisplay(){
    display.textContent = '';
}

function clear(){
    display.textContent = '';
    history.textContent = '';
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
    if(display.textContent == 'ERROR'){
        clear();
        return;
    }
    let operator = hasOperator(history.textContent);
    if(operator == false && history.textContent != ''){
        display.textContent = history.textContent;
    } else if(operator == false && history.textContent =='') {
        history.textContent = display.textContent;
        clearDisplay();
    } else {
        let intA = history.textContent.slice(0,-1);
        display.textContent = operate(operator.toString(),intA,display.textContent);
        history.textContent = '';
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