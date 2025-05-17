import { isPoweredOn, powerOnCalculator, powerOffCalculator } from './power.js';
import { handleMemory } from './memory.js';
import { handleOperations } from './operations.js';
import { handleEquals } from './equals.js';
import { addToHistory } from './history.js';
import { formatExpression } from './formatter.js';
import { handleInput } from './inputHandler.js';

let expression = '';
let memory = 0;
let finish = false;
let lastOperator = '';
let lastOperand = '';
let history = [];
const MAX_LENGTH = 12;

const displayPrev = document.querySelector('.previous');
const displayCurr = document.querySelector('.current');
const buttons = document.querySelector('.keypad');
const historyList = document.getElementById('historyList');

document.querySelector('.ac').addEventListener('click', clearAll);

function clearAll() {
  expression = '';
  finish = false;
  lastOperator = '';
  lastOperand = '';
  displayCurr.textContent = '0';
  displayPrev.textContent = '';
  historyList.innerHTML = '';
  history = [];
  document.querySelectorAll('.button').forEach((btn) => btn.classList.remove('active-operator'));
}

buttons.addEventListener('click', (e) => {
  const btn = e.target;
  if (!btn.classList.contains('button')) return;

  const key = btn.textContent;

  if (key === 'ON/C') {
    if (!isPoweredOn) powerOnCalculator();
    else powerOffCalculator();
    return;
  }

  if (!isPoweredOn) return;

  document.querySelectorAll('.button').forEach((b) => b.classList.remove('active-operator'));
  if (['+', '-', '*', '/'].includes(key)) {
    btn.classList.add('active-operator');
  }

  if (handleMemory(key)) return;
  if (handleOperations(key)) return;
  if (handleEquals(key)) return;
  if (handleInput(key)) return;
});
