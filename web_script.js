// Simple browser-based Number Guessing Game
const MIN = 1;
const MAX = 100;

let target = null;
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const restartBtn = document.getElementById('restartBtn');
const message = document.getElementById('message');
const attemptsEl = document.getElementById('attempts');

function init() {
  target = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  attempts = 0;
  attemptsEl.textContent = attempts;
  message.textContent = 'Make a guess!';
  guessInput.value = '';
  guessInput.focus();
}
function show(msg) {
  message.textContent = msg;
}

guessBtn.addEventListener('click', () => {
  const val = Number(guessInput.value);
  if (!Number.isInteger(val)) {
    show('Please enter an integer.');
    return;
  }
  attempts++;
  attemptsEl.textContent = attempts;
  if (val === target) {
    show(`🎉 Correct! The number was ${target}. You took ${attempts} guesses.`);
  } else if (val < target) {
    show('Too low. Try again.');
  } else {
    show('Too high. Try again.');
  }
});

guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') guessBtn.click();
});

restartBtn.addEventListener('click', init);

init();