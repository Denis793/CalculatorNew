export let isPoweredOn = false;
let powerTimeout = null;

export function powerOnCalculator() {
  isPoweredOn = true;
  displayCurr.textContent = '0';
  displayPrev.textContent = '';
  historyList.innerHTML = '';
  history = [];

  if (powerTimeout) clearTimeout(powerTimeout);
  powerTimeout = setTimeout(() => {
    powerOffCalculator();
  }, 15 * 60 * 1000); // 15 minutes
}

export function powerOffCalculator() {
  isPoweredOn = false;
  expression = '';
  memory = 0;
  finish = false;
  lastOperator = '';
  lastOperand = '';
  displayCurr.textContent = '';
  displayPrev.textContent = '';
  historyList.innerHTML = '';
  history = [];
}
