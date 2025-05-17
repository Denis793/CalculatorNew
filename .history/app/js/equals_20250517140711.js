export function handleEquals(key) {
  if (key !== '=') return false;

  try {
    if (!finish) {
      const result = eval(expression);
      const match = expression.match(/(.+)([+\-*/])\s*(-?\d+\.?\d*)$/);

      if (match) {
        lastOperator = match[2];
        lastOperand = match[3];
      } else {
        lastOperator = '';
        lastOperand = '';
      }

      displayCurr.textContent = formatExpression(result.toString());
      expression = result.toString();
      finish = true;
      displayPrev.textContent = '';

      addToHistory(`${match ? match[1] + match[2] + match[3] : expression} = ${result}`);
    } else if (lastOperator && lastOperand) {
      expression = `${expression}${lastOperator}${lastOperand}`;
      const result = eval(expression);
      displayCurr.textContent = formatExpression(result.toString());
      expression = result.toString();
      addToHistory(`${expression} = ${result}`);
    }
  } catch {
    displayCurr.textContent = 'Error';
    expression = '';
  }

  return true;
}
