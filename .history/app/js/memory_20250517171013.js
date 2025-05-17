import { state } from './state.js';
import { formatExpression } from './formatter.js';

export function handleMemory(key) {
  if (!state.memoryLog) state.memoryLog = [];

  if (key === 'MRC') {
    const indicator = document.querySelector('.indicator[data-key="MRC"]');
    if (state.memoryActive) {
      state.memoryActive = false;
      if (indicator) indicator.classList.remove('active');
    } else {
      state.displayCurr.textContent = formatExpression(state.memory.toString());
      state.expression = state.memory.toString();
      state.finish = false;
      state.memoryActive = true;
      if (indicator) indicator.classList.add('active');
    }
    return true;
  }

  if (key === 'M+') {
    const value = parseFloat(state.displayCurr.textContent.replace(/\s/g, '')) || 0;
    state.memory += value;
    state.memoryLog.push(`+${value}`);
    if (state.memoryLog.length > 5) state.memoryLog.shift();
    state.memoryActive = true;
    const indicator = document.querySelector('.indicator[data-key="MRC"]');
    if (indicator) indicator.classList.add('active');
    return true;
  }

  if (key === 'M-') {
    const value = parseFloat(state.displayCurr.textContent.replace(/\s/g, '')) || 0;
    state.memory -= value;
    state.memoryLog.push(`-${value}`);
    if (state.memoryLog.length > 5) state.memoryLog.shift();
    state.memoryActive = true;
    const indicator = document.querySelector('.indicator[data-key="MRC"]');
    if (indicator) indicator.classList.add('active');
    return true;
  }

  return false;
}
