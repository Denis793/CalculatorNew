import { powerOnCalculator, powerOffCalculator } from './power.js';
import { handleMemory } from './memory.js';
import { handleOperations } from './operations.js';
import { handleEquals } from './equals.js';
import { handleInput } from './inputHandler.js';

export const state = {
  expression: '',
  memory: 0,
  finish: false,
  lastOperator: '',
  lastOperand: '',
  history: [],
  MAX_LENGTH: 12,
  displayPrev: document.querySelector('.previous'),
  displayCurr: document.querySelector('.current'),
  buttons: document.querySelector('.keypad'),
  historyList: document.getElementById('historyList'),
  isPoweredOn: false,
  powerTimeout: null,
  parenthesesCount: 0,
  lastFunction: '',
};

export function clearAll() {
  state.expression = '';
  state.finish = false;
  state.lastOperator = '';
  state.lastOperand = '';
  state.displayCurr.textContent = '0';
  state.displayPrev.textContent = '';
  state.historyList.innerHTML = '';
  state.history = [];
  document.querySelectorAll('.button').forEach((btn) => btn.classList.remove('active-operator'));
}

export function initializeCalculator() {
  powerOffCalculator();

  document.querySelector('.ac').addEventListener('click', clearAll);

  state.buttons.addEventListener('click', (e) => {
    const btn = e.target;
    if (!btn.classList.contains('button')) return;

    const key = btn.textContent;

    if (key === 'ON') {
      if (!state.isPoweredOn) powerOnCalculator();
      else powerOffCalculator();
      return;
    }

    if (!state.isPoweredOn) return;

    document.querySelectorAll('.button').forEach((b) => b.classList.remove('active-operator'));
    if (['+', '-', '*', '/'].includes(key)) {
      btn.classList.add('active-operator');
    }

    document.querySelectorAll('.indicator').forEach((i) => i.classList.remove('active'));
    const indicator = document.querySelector(`.indicator[data-key="${key}"]`);
    if (indicator) indicator.classList.add('active');

    if (handleMemory(key)) return;
    if (handleOperations(key)) return;
    if (handleEquals(key)) return;
    if (handleInput(key)) return;
  });
}
