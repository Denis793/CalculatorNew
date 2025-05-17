import { state } from './state.js';
import { formatExpression } from './formatter.js';

export function handleMemory(key) {
  if (!state.memoryLog) state.memoryLog = [];

  if (key === 'MRC') {
    state.displayCurr.textContent = formatExpression(state.memory.toString());
    state.expression = state.memory.toString();
    state.finish = false;
    return true;
  }

  if (key === 'M+') {
    const value = parseFloat(state.displayCurr.textContent.replace(/\s/g, '')) || 0;
    state.memory += value;
    state.memoryLog.push(`+${value}`);
    if (state.memoryLog.length > 5) state.memoryLog.shift();
    return true;
  }

  if (key === 'M-') {
    const value = parseFloat(state.displayCurr.textContent.replace(/\s/g, '')) || 0;
    state.memory -= value;
    state.memoryLog.push(`-${value}`);
    if (state.memoryLog.length > 5) state.memoryLog.shift();
    return true;
  }

  return false;
}
