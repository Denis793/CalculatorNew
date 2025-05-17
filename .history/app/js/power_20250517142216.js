// power.js
import { state } from './state.js';

export let isPoweredOn = false;
let powerTimeout = null;

export function powerOnCalculator() {
  isPoweredOn = true;
  state.displayCurr.textContent = '0';
  state.displayPrev.textContent = '';
  state.historyList.innerHTML = '';
  state.history = [];

  if (powerTimeout) clearTimeout(powerTimeout);
  powerTimeout = setTimeout(() => {
    powerOffCalculator();
  }, 15 * 60 * 1000); // 15 хвилин
}

export function powerOffCalculator() {
  isPoweredOn = false;
  state.expression = '';
  state.memory = 0;
  state.finish = false;
  state.lastOperator = '';
  state.lastOperand = '';
  state.displayCurr.textContent = '';
  state.displayPrev.textContent = '';
  state.historyList.innerHTML = '';
  state.history = [];
}
