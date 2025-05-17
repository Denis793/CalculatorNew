import { state, clearAll } from './state.js';
import { formatExpression } from './formatter.js';

export function handleOperations(key) {
  if (key === '+/-') {
    if (state.displayCurr.textContent === '0') return true;
    if (state.finish) {
      state.expression = (-parseFloat(state.displayCurr.textContent.replace(/\s/g, ''))).toString();
      state.finish = false;
    } else {
      const match = state.expression.match(/(-?\d+\.?\d*)$/);
      if (match) {
        const num = match[0];
        const inverted = (-parseFloat(num)).toString();
        state.expression = state.expression.slice(0, -num.length) + inverted;
      } else {
        state.expression = '-' + state.expression;
      }
    }
    state.displayCurr.textContent = formatExpression(state.expression);
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
    if (state.expression === '') return true;
    const original = state.expression;
    const result = Math.sqrt(eval(original));
    const visible = `√${original}`;
    state.expression = result.toString();
    state.displayCurr.textContent = formatExpression(state.expression);
    state.displayPrev.textContent = visible;
    state.lastFunction = 'sqrt';
    state.lastOperator = '';
    state.lastOperand = '';
    state.finish = true;
    const indicator = document.querySelector(`.indicator[data-key="√"]`);
    if (indicator) indicator.classList.add('active');
    return true;
  }

  if (key === '(') {
    const lastChar = state.expression.slice(-1);
    if (/\d|\)/.test(lastChar)) return true;

    if (state.finish) {
      state.expression = '';
      state.finish = false;
    }

    state.expression += key;
    state.displayCurr.textContent = formatExpression(state.expression);
    state.parenthesesCount++;

    const indicator = document.querySelector('.indicator[data-key="()"]');
    if (indicator) indicator.classList.add('active');

    return true;
  }

  if (key === ')') {
    if (state.finish) {
      state.expression = '';
      state.finish = false;
    }
    state.expression += key;
    state.displayCurr.textContent = formatExpression(state.expression);
    if (state.parenthesesCount > 0) {
      state.parenthesesCount--;
      if (state.parenthesesCount === 0) {
        const indicator = document.querySelector(`.indicator[data-key="()"]`);
        if (indicator) indicator.classList.remove('active');
      }
    }
    return true;
  }

  if (key === 'x²') {
    const value = eval(state.expression || '0');
    const result = value ** 2;
    const visible = `${value}²`;
    state.expression = result.toString();
    state.displayCurr.textContent = formatExpression(state.expression);
    state.displayPrev.textContent = visible;
    state.lastFunction = 'square';
    state.lastOperator = '';
    state.lastOperand = '';
    state.finish = true;
    return true;
  }

  if (key === 'CE') {
    const match = state.expression.match(/.*?(?:[+\-*/(]|^)([\d.]+)$/);
    if (match) {
      state.expression = state.expression.slice(0, -match[1].length);
    } else {
      state.expression = '';
    }
    state.lastFunction = '';
    state.displayCurr.textContent = formatExpression(state.expression) || '0';
    document.querySelectorAll('.indicator').forEach((i) => i.classList.remove('active'));
    return true;
  }

  if (key === 'C') {
    clearAll();
    return true;
  }

  return false;
}
