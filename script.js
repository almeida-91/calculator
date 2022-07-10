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

function operate(operatorA, intA, intB){
    if (operatorA == '/' && intB == "") return divide(intA,1);
    if (operatorA == '/' && intB == 0) return "ERROR";
    initialValue = '';
    result = NaN;
    switch(operatorA){
        case `+`:
            operator = '';
            return result = add(intA, intB);
        case `-`:
            operator = '';
            return result = subtract(intA, intB);
        case `*`:
            operator = '';
            return result = multiply(intA, intB);
        case `/`:
            operator = '';
            return result = divide(intA, intB);
        case `^`:
            operator = '';
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
const backspace = document.getElementById(`backspace`);
let result = NaN;
let initialValue = '';
let operator = '';
let pass = 0;

for (i=0 ; i < numberbuttons.length; i++){
    numberbuttons[i].addEventListener(`click`, function(e){
        if (initialValue == 'ERROR') clearDisplay();
        if(display.textContent == 'ERROR') clearDisplay();
        if(result == display.textContent){
            clear();
            result = NaN;
        }
        display.textContent += e.target.textContent;
    });
}

for (i=0 ; i < operators.length ; i++){
    operators[i].addEventListener(`click`, function(e){
        if (initialValue == 'ERROR') clearDisplay();
        if (display.textContent == result){
            initialValue = display.textContent;
        }
        if (initialValue == '') initialValue = display.textContent;
        if (operator == '' && display.textContent != '') initialValue = display.textContent;
        if (operator == ''){
            operator = e.target.textContent;
            clear();
        } else if(result == display.textContent){
            operator = e.target.textContent;
            display.textContent = '';  
        } else {
            result = NaN;
            getResult();
            initialValue = display.textContent;
            operator = e.target.textContent;
        }
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
    if (initialValue == '' && display.textContent!= result) initialValue = display.textContent;
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
        result = operate(operator.toString(),initialValue,display.textContent);
        if(isDecimal(result.toString())){
            pass = 0;
            for( let i = 1 ; i < 100000 ; i = i*10){
                if (isDecimal((+result*i).toString())==false){
                    result = +result.toFixed(pass);
                    break;
                }
                pass++;
            }
            result = result.toFixed(pass);
        }
        display.textContent = result;
        initialValue = '';
        result = display.textContent;
    }
}

function isDecimal(string){
    for ( let i = 0 ; i<string.length ; i++){
        if (string[i] == '.') return true;
    }
    return false;
}

decimal.addEventListener(`click`, function (e){
    if(!isDecimal(display.textContent)){
        display.textContent += `.`;
    }       
})

backspace.addEventListener(`click`, function(){
    display.textContent = display.textContent.slice(0,-1);
})


//add keyboard support

document.addEventListener(`keydown`, (e)=>{
    if (e.code == 'Backspace' || e.code == 'Delete'){
        if (display.textContent == result) clearbutton.click();
        else backspace.click();
    }
    if (e.code == 'Escape') clearbutton.click();
})

document.addEventListener(`keypress`, (e)=>{
    if (e.code == `NumpadDecimal` || e.code == `Period` ){
        decimal.click();    
    } else if ((e.code == `NumpadEnter` || e.code == 'Enter' || e.code == `Equal`) && operator != ''){
        equals.click();
    } else if (e.key == `+` || e.key == '-' || e.key == '*' || e.key == '/' || e.key == '^'){
        for(let i = 0 ; i < operators.length ; i++){
            if (e.key == `${operators[i].textContent}`) operators[i].click();
        }
    }
    else {
        for (i = 0 ; i<10 ; i++){
            if (e.code == `Numpad${i}` || e.code == `Digit${i}`){
                if (initialValue == 'ERROR' || display.textContent == 'ERROR') clearDisplay();
                if (result == display.textContent){
                    clear();
                    result = NaN;
                }
                display.textContent += `${i}`;
            };
        };
    };
});

