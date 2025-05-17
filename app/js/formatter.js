export function formatExpression(expression) {
  return expression.replace(/\d+/g, (match) => {
    return Number(match).toLocaleString('en-US').replace(/,/g, ' ');
  });
}
