"use strict";

const wordLength = 5;
const wordGuess = 6;
let wordList = ["panic", "proxy", "piano", "horse", "lover", "pizza"];

let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

let currentAttempt = "";
let history = [];

let grid = document.getElementById("grid");
buildGrid();
updateGrid();
window.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
  let letter = e.key.toLowerCase();
  if (letter === "enter") {
    if (currentAttempt.length < wordLength) {
      return;
    }
    if (!wordList.includes(currentAttempt)) {
      alert("Not in the word list");
      return;
    }
    history.push(currentAttempt);
    currentAttempt = "";
  } else if (letter === "backspace") {
    currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1);
  } else if (/[a-z]/.test(letter)) {
    if (currentAttempt.length < wordLength) {
      currentAttempt += letter;
    }
  }
  updateGrid();
}

function buildGrid() {
  for (let i = 0; i < wordGuess; i++) {
    let row = document.createElement("div");
    for (let j = 0; j < wordLength; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = "";
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

function updateGrid() {
  let row = grid.firstChild;
  for (let attempt of history) {
    drawAttempt(row, attempt, false);
    row = row.nextSibling;
  }
  drawAttempt(row, currentAttempt, true);
}

function drawAttempt(row, attempt, isCurrent) {
  for (let i = 0; i < wordLength; i++) {
    let cell = row.children[i];
    if (attempt[i] !== undefined) {
      cell.textContent = attempt[i] ?? "";
    } else {
      // TODO: fix the line gap in a proper way
      cell.innerHTML = `<div style="opacity: 0">A</div>`;
    }
    if (isCurrent) {
      cell.style.backgroundColor = "#111";
    } else {
      cell.style.backgroundColor = getBgColor(attempt, i);
    }
  }
}

function getBgColor(letter, i) {
  let correctLetter = secret[i];
  let attemptLetter = letter[i];
  if (attemptLetter === undefined || secret.indexOf(attemptLetter) === -1) {
    return "#212121";
  }
  if (correctLetter === attemptLetter) {
    return "#538d4e";
  }
  return "#b59f3b";
}
