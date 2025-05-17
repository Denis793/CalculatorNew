import { state } from './state.js';
import { formatExpression } from './formatter.js';
import { addToHistory } from './history.js';

export function handleEquals(key) {
  if (key !== '=') return false;

  try {
    if (!state.finish) {
      const result = eval(state.expression);
      const match = state.expression.match(/(.+)([+\-*/])\s*(-?\d+\.?\d*)$/);

      if (match) {
        state.lastOperator = match[2];
        state.lastOperand = match[3];
      } else {
        state.lastOperator = '';
        state.lastOperand = '';
      }

      const visible = state.displayPrev.textContent || state.expression;

      state.displayCurr.textContent = formatExpression(result.toString());
      state.expression = result.toString();
      state.finish = true;
      state.displayPrev.textContent = '';

      addToHistory(`${visible} = ${result}`);
    } else if (state.lastOperator && state.lastOperand) {
      state.expression = `${state.expression}${state.lastOperator}${state.lastOperand}`;
      const result = eval(state.expression);
      state.displayCurr.textContent = formatExpression(result.toString());
      state.expression = result.toString();
      addToHistory(`${state.expression} = ${result}`);
    }
  } catch {
    state.displayCurr.textContent = 'Error';
    state.expression = '';
  }

  return true;
}
