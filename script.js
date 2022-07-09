function add(intA, intB){
    return +intA + +intB;
}

function subtract(intA, intB){
    return intA - intB;
}

function multiply(intA, intB){
    return intA * intB;
}

function divide(intA, intB){
    return intA / intB;
}

function power(intA, intB){
    return intA ** intB;
}

function operate(operator, intA, intB){
    operator = operator.toString();
    switch(operator){
        case `+`:
            return add(intA, intB);
        case `-`:
            return subtract(intA, intB);
        case `*`:
            return multiply(intA, intB);
        case `/`:
            return divide(intA, intB);
    }
}

const numberbuttons = document.getElementsByClassName(`number`);
const operators = document.getElementsByClassName(`operator`);
const display = document.getElementById(`display`);
const clearbutton = document.getElementById(`clear`);
const history = document.getElementById(`history`);

for (i=0 ; i < numberbuttons.length; i++){
    numberbuttons[i].addEventListener(`click`, function(e){
        display.textContent += e.target.textContent;
    });
}

for (i=0 ; i < operators.length ; i++){
    operators[i].addEventListener(`click`, function(e){
        let operator = hasOperator(history.textContent);
        if(operator == false){
            history.textContent += display.textContent+e.target.textContent;
        } else {
            let intA = history.textContent.slice(0,-1);
            display.textContent = operate(operator.toString(),intA,display.textContent);
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
        if (string[i]== `+` || string[i] == '-' || string[i] == '*' || string[i] == '/'){
            return string[i];
        }
    }
    return false;
}