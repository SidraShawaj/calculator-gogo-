const resultsEditor = document.querySelector('.results-display');
const equationEditor = document.querySelector('.equation-display');
const inputBtns = document.querySelectorAll('.cal-btn'); 
const deleteBtn = document.querySelector('.delete')
const clearBtn = document.querySelector('.clear');
const equalsBtn = document.querySelector('.equal');
const xVal = document.getElementById('x-val');
const yVal = document.getElementById('y-val');
const zVal = document.getElementById('z-val');

let equation = '';

const operators = [
    '+',
    '-',
    '*',
    '/'
];
const variables = [
    'X',
    'Y',
    'Z'
];
const numbers = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
];

const validateInput = (value) => {
    switch(value){
        case '0':
            if(equation === '' || operators.includes(equation[-1])) {
                return false;
            } else {
                return true;
            }
        case '+':
        case '-':
        case '*':
        case '/':
            if(equation === '' || operators.includes(equation.slice(-1))){
                return false;
            } else {
                return true;
            }
        case 'X':
        case 'Y':
        case 'Z':
            if (variables.includes(equation.slice(-1))){
                return false;
            }
        default: return true;
    }
} 

const validateEquation = () => {
    if(equation.indexOf('X') != -1) {
        if(xVal.value === '') {
            displayResults('Please enter a value for X.')
            return false;
        }
    }

   if(equation.indexOf('Y') != -1) {
        if(yVal.value === '') {
            displayResults('Please enter a value for Y.')
            return false;
        }
    } 
 
    if(equation.indexOf('Z') != -1) {
        if(zVal.value === '') {
            displayResults('Please enter a value for Z.')
            return false; 
        }
    }
    
    return true; 
}

const appendEquation = (input) => {  
    if(variables.includes(input) && numbers.includes(equation.slice(-1))){
        equation += '*' + input; 
    } 
    else if(numbers.includes(input) && variables.includes(equation.slice(-1))){
        equation += '*' + input; 
    } else { 
        equation += input; 
    }
}

const updateEquationDisplay = () => {
    equationEditor.innerText = equation;
}

const displayResults = (results) => {
    resultsEditor.innerText = results;
}

const clear = () => {
    equation = '';
    xVal.value = '';
    yVal.value = '';
    zVal.value = '';
    displayResults('');
}

inputBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(resultsEditor.innerText !== ''){
            clear();
        } 
        if (validateInput(btn.innerText)) {
            appendEquation(btn.innerText);
        };
       updateEquationDisplay();
    });
})

equalsBtn.addEventListener('click', () => {
    if (validateEquation()) {
        let finalEquation = equation.replace('X', xVal.value);
        finalEquation = finalEquation.replace('Y', yVal.value);
        finalEquation = finalEquation.replace('Z', zVal.value);

        resultsEditor.innerText = eval(finalEquation);
    }  
})

deleteBtn.addEventListener('click', () => {
    equation = equation.slice(0,-1)
    updateEquationDisplay();
})

clearBtn.addEventListener('click', () => {
    clear();
    updateEquationDisplay();
})