import { state } from './state.js';
import { formatExpression } from './formatter.js';
import { addToHistory } from './history.js';

export function handleEquals(key) {
  if (key !== '=') return false;

  try {
    const open = (state.expression.match(/\(/g) || []).length;
    const close = (state.expression.match(/\)/g) || []).length;
    if (open !== close) return true;

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

      const containsOperator = /[+\-*/()]|Math\.sqrt|%/.test(visible);
      const isSame = visible.replace(/\s/g, '') === result.toString();

      if (containsOperator && !isSame) {
        addToHistory(`${visible} = ${result}`);
      }
    } else if (state.lastFunction === 'sqrt' && state.finish) {
      const value = parseFloat(state.expression);
      const result = Math.sqrt(value);
      const visible = `√${value}`;
      state.displayCurr.textContent = formatExpression(result.toString());
      state.expression = result.toString();
      state.displayPrev.textContent = visible;
      addToHistory(`${visible} = ${result}`);
      return true;
    } else if (state.lastOperator && state.lastOperand) {
      state.expression = `${state.expression}${state.lastOperator}${state.lastOperand}`;
      const result = eval(state.expression);
      state.displayCurr.textContent = formatExpression(result.toString());
      state.expression = result.toString();
      addToHistory(`${state.expression} = ${result}`);
    }
  } catch {
    return true;
  }

  return true;
}
