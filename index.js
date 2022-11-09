"use strict";

let grid = document.getElementById("grid");

function buildGrid() {
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("div");
    for (let j = 0; j < 5; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = "";
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

buildGrid();

let wordList = [
  // "panic",
  // "proxy",
  // "piano",
  // "horse",
  "lover",
];

let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

let attempts = ["loveq", "drock"];
let currentAttempt = "";

updateGrid();

function updateGrid() {
  let row = grid.firstChild;
  for (let attempt of attempts) {
    drawPastAttempt(row, attempt);
    row = row.nextSibling;
  }
  drawCurrentAttempt(row, currentAttempt);
}

function drawPastAttempt(row, attempt) {
  for (let i = 0; i < 5; i++) {
    let cell = row.children[i];
    if (attempt[i] !== undefined) {
      cell.textContent = attempt[i];
    } else {
      // TODO: fix the line gap in a proper way
      cell.innerHTML = `<div style="opacity: 0">A</div>`;
    }
    cell.style.backgroundColor = getBgColor(attempt, i);
  }
}

function drawCurrentAttempt(row, attempt) {
  for (let i = 0; i < 5; i++) {
    let cell = row.children[i];
    cell.textContent = attempt[i] ?? "";
  }
}

function getBgColor(letter, index) {
  let correctLetter = secret[index];
  let attemptLetter = letter[index];
  if (attemptLetter === undefined || secret.indexOf(attemptLetter) === -1) {
    return "#212121";
  }
  if (correctLetter === attemptLetter) {
    return "#538d4e";
  }
  return "#b59f3b";
}
