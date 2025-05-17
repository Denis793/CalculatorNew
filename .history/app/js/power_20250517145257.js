// power.js
import { state } from './state.js';

export function powerOnCalculator() {
  state.isPoweredOn = true;
  state.displayCurr.textContent = '0';
  state.displayCurr.classList.remove('off');
  state.displayPrev.textContent = '';
  state.historyList.innerHTML = '';
  state.history = [];

  if (state.powerTimeout) clearTimeout(state.powerTimeout);
  state.powerTimeout = setTimeout(() => {
    powerOffCalculator();
  }, 15 * 60 * 1000);
}

export function powerOffCalculator() {
  state.isPoweredOn = false;
  state.expression = '';
  state.memory = 0;
  state.finish = false;
  state.lastOperator = '';
  state.lastOperand = '';
  state.displayCurr.textContent = 'OFF'; // 🟡 ІНДИКАТОР
  state.displayCurr.classList.add('off');
  state.displayPrev.textContent = '';
  state.historyList.innerHTML = '';
  state.history = [];
}
