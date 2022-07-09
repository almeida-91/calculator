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