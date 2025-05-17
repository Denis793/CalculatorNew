export function formatExpression(raw) {
  return raw.replace(/\d{1,}/g, (match) => match.replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
}
