// DOM Elements
const valueEl = document.querySelector('.display');
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');

// Button Elements
const clearEl = document.querySelector('.C');
const percentEl = document.querySelector('.percent');
const divisionEl = document.querySelector('.division');
const multiplicationEl = document.querySelector('.multiplication');
const subtractionEl = document.querySelector('.subtraction');
const additionEl = document.querySelector('.addition');
const equalEl = document.querySelector('.equal');
const decimalEl = document.querySelector('.decimal');
const numberButtons = Array.from(document.querySelectorAll('.button.number-0, .button.number-1, .button.number-2, .button.number-3, .button.number-4, .button.number-5, .button.number-6, .button.number-7, .button.number-8, .button.number-9'));

// Variables for memory and operations
let currentValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

// Helper Functions
const updateDisplay = () => {
  valueEl.textContent = currentValue;
};

const resetCalculator = () => {
  currentValue = '0';
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  updateDisplay();
};

const handleNumberClick = (num) => {
  if (waitingForSecondValue) {
    currentValue = num;
    waitingForSecondValue = false;
  } else {
    currentValue = currentValue === '0' ? num : currentValue + num;
  }
  updateDisplay();
};

const handleOperatorClick = (op) => {
  const mappedOperator = op === 'x' ? '*' : op; // Map 'x' to '*'
  if (firstValue === null) {
    firstValue = parseFloat(currentValue);
    operator = mappedOperator;
    waitingForSecondValue = true;
  } else if (operator) {
    const result = calculate();
    currentValue = result.toString();
    firstValue = result;
    operator = mappedOperator;
    waitingForSecondValue = true;
  }
  updateDisplay();
};

const calculate = () => {
  const secondValue = parseFloat(currentValue);
  switch (operator) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '*':
      return firstValue * secondValue;
    case '/':
      return firstValue / secondValue;
    default:
      return secondValue;
  }
};

const handleEqualClick = () => {
  if (operator && firstValue !== null) {
    currentValue = calculate().toString();
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    updateDisplay();
  }
};

const handleDecimalClick = () => {
  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateDisplay();
  }
};

const handlePercentClick = () => {
  currentValue = (parseFloat(currentValue) / 100).toString();
  updateDisplay();
};

const handleClearClick = () => {
  resetCalculator();
};

const handleTimeUpdate = () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  hourEl.textContent = hour > 12 ? hour - 12 : hour; // 12-hour format
  minuteEl.textContent = minute.toString().padStart(2, '0'); // pad single digits with 0
};

// Add Event Listeners
clearEl.addEventListener('click', handleClearClick);

percentEl.addEventListener('click', handlePercentClick);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleNumberClick(button.textContent);
  });
});

decimalEl.addEventListener('click', handleDecimalClick);

additionEl.addEventListener('click', () => {
  handleOperatorClick('+');
});

subtractionEl.addEventListener('click', () => {
  handleOperatorClick('-');
});

multiplicationEl.addEventListener('click', () => {
  handleOperatorClick('x'); // Use 'x' for multiplication
});

divisionEl.addEventListener('click', () => {
  handleOperatorClick('/');
});

equalEl.addEventListener('click', handleEqualClick);

// Update time every second
setInterval(handleTimeUpdate, 1000);
handleTimeUpdate(); // initial call to set the time
