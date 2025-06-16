import { GameMediator } from './core/Mediator';
import { ScoreHistory } from './core/ScoreHistory';
import { GAME_COMPLEXITY } from './types';

const messageEl = document.getElementById('message')!;
const inputEl = document.getElementById('input-guess') as HTMLInputElement;
const btnGuess = document.getElementById('btn-guess') as HTMLButtonElement;
const guessesList = document.getElementById('guesses-list')!;
const winPopup = document.getElementById('win-popup')!;
const btnRestart = document.getElementById('btn-restart')!;
const winMessage = document.getElementById('win-message')!;
const nameInput = document.getElementById('player-name') as HTMLInputElement;
const scoresTableBody = document.getElementById('scores-table-body')!;
const attemptsEl = document.getElementById('attempts')!;

const easyCheckbox = document.getElementById('easy-level') as HTMLInputElement;
const mediumCheckbox = document.getElementById('medium-level') as HTMLInputElement;
const hardCheckbox = document.getElementById('hard-level') as HTMLInputElement;

let targetNumber = 0;
let guesses: number[] = [];

const scoreHistory = ScoreHistory.getInstance();

const mediator = new GameMediator(
  (msg: string) => {
    messageEl.textContent = msg;
    messageEl.classList.toggle('hint', msg === 'More!' || msg === 'Less!');
  },
  (attempts: number) => {
    attemptsEl.textContent = `Attempts: ${attempts}`;
  },
  (target: number) => {
    targetNumber = target;
    showWinPopup();
  }
);

function resetGuesses() {
  guesses = [];
  renderGuesses();
}

function renderGuesses() {
  guessesList.innerHTML = '';
  [...guesses].reverse().forEach((guess, index) => {
    const li = document.createElement('li');
    li.textContent = `#${guesses.length - index}: ${guess}`;
    guessesList.appendChild(li);
  });
}

function getCurrentLevelText(): string {
  if (mediumCheckbox.checked) return '1-50';
  if (hardCheckbox.checked) return '1-100';
  return '1-10';
}

function showWinPopup() {
  winMessage.innerHTML = `
    🎉 Congratulations! You guessed the number <strong>${targetNumber}</strong>!<br/>
    ✨ You used <strong>${guesses.length}</strong> attempt(s)<br/>
    📊 Level: <strong>${getCurrentLevelText()}</strong>
  `;

  winPopup.classList.remove('hidden');
  btnGuess.disabled = true;
  inputEl.disabled = true;
}

function hideWinPopup() {
  winPopup.classList.add('hidden');
  btnGuess.disabled = false;
  inputEl.disabled = false;
  inputEl.value = '';
  inputEl.focus();
  nameInput.value = '';
  setLevelFromCheckboxes();
}

function setLevelFromCheckboxes() {
  let level = GAME_COMPLEXITY.Easy;
  if (mediumCheckbox.checked) level = GAME_COMPLEXITY.Medium;
  if (hardCheckbox.checked) level = GAME_COMPLEXITY.Hard;

  mediator.setLevel(level);
  resetGuesses();
}

function handleLevelChange(changed: HTMLInputElement) {
  [easyCheckbox, mediumCheckbox, hardCheckbox].forEach(checkbox => {
    if (checkbox !== changed) checkbox.checked = false;
  });
  setLevelFromCheckboxes();
}

function makeGuess() {
  const guess = Number(inputEl.value);
  if (isNaN(guess)) {
    messageEl.textContent = 'Enter a valid number!';
    return;
  }

  guesses.push(guess);
  renderGuesses();

  mediator.guess(guess);
  inputEl.value = '';
  inputEl.focus();
}

function renderScores() {
  const scores = scoreHistory.getScores();
  scoresTableBody.innerHTML = '';
  
  scores.forEach((score, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${score.name}</td>
      <td>${score.attempts}</td>
      <td>${score.level}</td>
      <td>${score.date}</td>
    `;
    scoresTableBody.appendChild(tr);
  });
}

easyCheckbox.addEventListener('change', () => handleLevelChange(easyCheckbox));
mediumCheckbox.addEventListener('change', () => handleLevelChange(mediumCheckbox));
hardCheckbox.addEventListener('change', () => handleLevelChange(hardCheckbox));

btnGuess.addEventListener('click', makeGuess);

inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') makeGuess();
});

btnRestart.addEventListener('click', () => {
  const playerName = nameInput.value.trim() || 'Unknown player';
  
  scoreHistory.addScore({
    name: playerName,
    attempts: guesses.length,
    date: new Date().toLocaleDateString(),
    level: getCurrentLevelText(),
  });

  renderScores();
  hideWinPopup();
});

setLevelFromCheckboxes();
renderScores();