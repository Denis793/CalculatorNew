export function handleMemory(key) {
  if (key === 'MRC') {
    displayCurr.textContent = formatExpression(memory.toString());
    expression = memory.toString();
    finish = false;
    return true;
  }

  if (key === 'M+') {
    memory += parseFloat(displayCurr.textContent.replace(/\s/g, '')) || 0;
    return true;
  }

  if (key === 'M-') {
    memory -= parseFloat(displayCurr.textContent.replace(/\s/g, '')) || 0;
    return true;
  }

  return false;
}
