// memory.js
import { state } from './state.js';
import { formatExpression } from './formatter.js';

export function handleMemory(key) {
  if (key === 'MRC') {
    state.displayCurr.textContent = formatExpression(state.memory.toString());
    state.expression = state.memory.toString();
    state.finish = false;
    return true;
  }

  if (key === 'M+') {
    state.memory += parseFloat(state.displayCurr.textContent.replace(/\s/g, '')) || 0;
    return true;
  }

  if (key === 'M-') {
    state.memory -= parseFloat(state.displayCurr.textContent.replace(/\s/g, '')) || 0;
    return true;
  }

  return false;
}
