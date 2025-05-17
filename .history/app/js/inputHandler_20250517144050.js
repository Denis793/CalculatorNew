// inputHandler.js
import { state } from './state.js';
import { formatExpression } from './formatter.js';

export function handleInput(key) {
  const allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '00'];
  if (!allowed.includes(key)) return false;

  if (state.finish) {
    if (!isNaN(key) || key === '(') state.expression = '';
    state.finish = false;
  }

  const digitsOnly = state.expression.replace(/\D/g, '');
  if (digitsOnly.length >= state.MAX_LENGTH) return true;

  state.expression += key;
  state.displayCurr.textContent = formatExpression(state.expression);
  return true;
}
console.log('handleInput викликано з ключем:', key);
