export function handleOperations(key) {
  if (key === '+/-') {
    if (displayCurr.textContent === '0') return true;

    if (finish) {
      expression = (-parseFloat(displayCurr.textContent.replace(/\s/g, ''))).toString();
      displayCurr.textContent = formatExpression(expression);
      finish = false;
    } else if (expression) {
      const match = expression.match(/(-?\d+\.?\d*)$/);
      if (match) {
        const num = match[0];
        const inverted = (-parseFloat(num)).toString();
        expression = expression.slice(0, -num.length) + inverted;
      } else {
        expression = '-' + expression;
      }
      displayCurr.textContent = formatExpression(expression);
    }
    return true;
  }

  if (key === '←') {
    if (finish) return true;
    expression = expression.slice(0, -1);
    displayCurr.textContent = formatExpression(expression) || '0';
    return true;
  }

  if (key === '%') {
    expression += '/100';
    displayCurr.textContent = formatExpression(expression);
    return true;
  }

  if (key === '√') {
    expression = `Math.sqrt(${expression})`;
    displayCurr.textContent = formatExpression(expression);
    return true;
  }

  if (key === '(' || key === ')') {
    if (finish) {
      expression = '';
      finish = false;
    }
    expression += key;
    displayCurr.textContent = formatExpression(expression);
    return true;
  }

  if (key === 'CE') {
    const match = expression.match(/.*?(?:[+\-*/(]|^)([\d.]+)$/);
    if (match) {
      expression = expression.slice(0, -match[1].length);
    } else {
      expression = '';
    }
    displayCurr.textContent = formatExpression(expression) || '0';
    return true;
  }

  if (key === 'C') {
    clearAll();
    return true;
  }

  return false;
}
