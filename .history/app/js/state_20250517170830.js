import { handleMemory } from './memory.js';
import { handleOperations } from './operations.js';
import { handleEquals } from './equals.js';
import { handleInput } from './inputHandler.js';

export const state = {
  expression: '',
  memory: 0,
  memoryLog: [],
  memoryActive: false,

  finish: false,
  lastOperator: '',
  lastOperand: '',
  history: [],
  MAX_LENGTH: 12,
  displayPrev: document.querySelector('.previous'),
  displayCurr: document.querySelector('.current'),
  buttons: document.querySelector('.keypad'),
  historyList: document.getElementById('historyList'),
  lastFunction: '',
  parenthesesCount: 0,
};

export function clearAll() {
  state.expression = '';
  state.finish = false;
  state.lastOperator = '';
  state.lastOperand = '';
  state.lastFunction = '';
  state.parenthesesCount = 0;
  state.displayCurr.textContent = '0';
  state.displayPrev.textContent = '';
  state.historyList.innerHTML = '';
  state.history = [];
  state.memoryActive = false;

  document.querySelectorAll('.button').forEach((btn) => btn.classList.remove('active-operator'));
  document.querySelectorAll('.indicator').forEach((i) => i.classList.remove('active'));
}

export function initializeCalculator() {
  clearAll();

  document.querySelector('.ac').addEventListener('click', clearAll);

  state.buttons.addEventListener('click', (e) => {
    const btn = e.target;
    if (!btn.classList.contains('button')) return;

    const key = btn.textContent;

    const specialKeys = ['MRC', 'M-', 'M+', '+/-', '√'];
    if (specialKeys.includes(key)) {
      document.querySelectorAll('.indicator').forEach((i) => {
        const keep = i.dataset.key === '()' && state.parenthesesCount > 0;
        if (!keep) i.classList.remove('active');
      });
      const indicator = document.querySelector(`.indicator[data-key="${key}"]`);
      if (indicator) indicator.classList.add('active');
    }

    if (handleMemory(key)) return;
    if (handleOperations(key)) return;
    if (handleEquals(key)) return;
    if (handleInput(key)) return;
  });
}
