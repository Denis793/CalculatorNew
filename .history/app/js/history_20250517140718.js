export function addToHistory(item) {
  history.push(item);
  if (history.length > 3) history.shift();

  historyList.innerHTML = '';
  history.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
  });
}
