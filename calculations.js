const resultsEditor = document.querySelector('.results-display');
const equationEditor = document.querySelector('.equation-display');
const variableBtn = document.querySelectorAll('.variable');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const deleteBtn = document.querySelector('.delete');
const clearBtn = document.querySelector('.clear');
const equalsBtn = document.querySelector('.equal');
const xVal = document.getElementById('x-val');
const yVal = document.getElementById('y-val');
const zVal = document.getElementById('z-val');

// to store the operands and operator input from the user
let currNum = '';

const operatorList = [
    '+',
    '-',
    '*',
    '/'
]

const variableList = [
    'X',
    'Y',
    'Z'
]

const validateInput = (value) => {
    switch(value){
        case '0':
            if(currNum === '' || operatorList.includes(currNum[-1])) {
                return false;
            }
            else return true;
        case '+':
        case '-':
        case '*':
        case '/':
            if(operatorList.includes(currNum.slice(-1))){
                return false;
            }
            else return true;
        case 'X':
        case 'Y':
        case 'Z':
            if (variableList.includes(currNum.slice(-1))){
                return false;
            }
        default: return true;
    }
}

const validateEquation = () => {
    if(currNum.indexOf('X') != -1) {
        if(xVal.value === '') {
            displayResults('Please enter a value for X.')
            return false;
        }
    }

   if(currNum.indexOf('Y') != -1) {
        if(yVal.value === '') {
            displayResults('Please enter a value for Y.')
            return false;
        }
    } 
 
    if(currNum.indexOf('Z') != -1) {
        if(zVal.value === '') {
            displayResults('Please enter a value for Z.')
            return false; 
        }
    }
    
    return true; 

}

//store the input number
const input = (character) => { 
    if(variableList.includes(character)){
        if(!operatorList.includes(currNum.slice(-1)) && currNum !== ''){
            currNum += '*' + character; 
        }
        else currNum += character;
    }
    else if(variableList.includes(currNum.slice(-1)) && !operatorList.includes(character)){
        currNum += '*' + character; 
    }
    else currNum = currNum + character;
}

const displayEquation = () => {
    equationEditor.innerText = currNum;
}

const displayResults = (results) => {
    resultsEditor.innerText = results;
}

numberBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if (validateInput(btn.innerText)) {
            input(btn.innerText);
        };
       displayEquation();
    });
})

operatorBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if (validateInput(btn.innerText)) {
            input(btn.innerText);
        };
       displayEquation();
    });
})

equalsBtn.addEventListener('click', () => {
    if (validateEquation()) {
        console.log('witcher');
        let newCurr = currNum.replace('X', xVal.value);
        newCurr = newCurr.replace('Y', yVal.value);
        newCurr = newCurr.replace('Z', zVal.value);
        console.log(newCurr);
        resultsEditor.innerText = eval(newCurr);
    }  
})

deleteBtn.addEventListener('click', () => {
    currNum = currNum.slice(0,-1)
    displayEquation();
})

clearBtn.addEventListener('click', () => {
    currNum = '';
    xVal.value = '';
    yVal.value = '';
    zVal.value = '';
    displayEquation();
    displayResults('');
})

variableBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if (validateInput(btn.innerText)) {
            input(btn.innerText); 
        };
       displayEquation();
    });
})



