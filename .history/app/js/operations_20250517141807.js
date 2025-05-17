import { formatExpression } from './formatter.js';
import { clearAll, state } from './state.js';

export function handleOperations(key) {
  if (key === '+/-') {
    if (state.displayCurr.textContent === '0') return true;

    if (state.finish) {
      state.expression = (-parseFloat(state.displayCurr.textContent.replace(/\s/g, ''))).toString();
      state.displayCurr.textContent = formatExpression(state.expression);
      state.finish = false;
    } else if (state.expression) {
      const match = state.expression.match(/(-?\d+\.?\d*)$/);
      if (match) {
        const num = match[0];
        const inverted = (-parseFloat(num)).toString();
        state.expression = state.expression.slice(0, -num.length) + inverted;
      } else {
        state.expression = '-' + state.expression;
      }
      state.displayCurr.textContent = formatExpression(state.expression);
    }
    return true;
  }

  if (key === '←') {
    if (state.finish) return true;
    state.expression = state.expression.slice(0, -1);
    state.displayCurr.textContent = formatExpression(state.expression) || '0';
    return true;
  }

  if (key === '%') {
    state.expression += '/100';
    state.displayCurr.textContent = formatExpression(state.expression);
    return true;
  }

  if (key === '√') {
    state.expression = `Math.sqrt(${state.expression})`;
    state.displayCurr.textContent = formatExpression(state.expression);
    return true;
  }

  if (key === '(' || key === ')') {
    if (state.finish) {
      state.expression = '';
      state.finish = false;
    }
    state.expression += key;
    state.displayCurr.textContent = formatExpression(state.expression);
    return true;
  }

  if (key === 'CE') {
    const match = state.expression.match(/.*?(?:[+\-*/(]|^)([\d.]+)$/);
    if (match) {
      state.expression = state.expression.slice(0, -match[1].length);
    } else {
      state.expression = '';
    }
    state.displayCurr.textContent = formatExpression(state.expression) || '0';
    return true;
  }

  if (key === 'C') {
    clearAll();
    return true;
  }

  return false;
}
