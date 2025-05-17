export function handleInput(key) {
  const allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '00'];
  if (!allowed.includes(key)) return false;

  if (finish) {
    if (!isNaN(key) || key === '(') expression = '';
    finish = false;
  }

  const digitsOnly = expression.replace(/\D/g, '');
  if (digitsOnly.length >= MAX_LENGTH) return true;

  expression += key;
  displayCurr.textContent = formatExpression(expression);
  return true;
}
