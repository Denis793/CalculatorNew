import { state } from './state.js';

export function addToHistory(item) {
  state.history.push(item);
  if (state.history.length > 3) state.history.shift();

  state.historyList.innerHTML = '';
  state.history.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry;
    state.historyList.appendChild(li);
  });
}
