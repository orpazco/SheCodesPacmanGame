'use strict';
const WALL = '🟫';
const FOOD = '◆';
const EMPTY = ' ';
const POWER_FOOD = '🍔';
const CHERRY = '🍒';

var gFoodCount;
var gIntervalCherry;

var gBoard;

var gGame = {
  score: 0,
  isOn: false,
};

function init() {
  gGame.score = 0;
  gBoard = buildBoard();
  gFoodCount = getFoodCount();
  createPackman(gBoard);
  createGhosts(gBoard);
  gIntervalCherry = setInterval(getCherry, 1000);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
      }

      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === SIZE - 2) ||
        (i === SIZE - 2 && j === 1) ||
        (i === SIZE - 2 && j === SIZE - 2)
      ) {
        board[i][j] = POWER_FOOD;
      }
    }
  }
  return board;
}

function getFoodCount() {
  var foodCount = 0;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === FOOD || gBoard[i][j] === POWER_FOOD) {
        foodCount++;
      }
    }
  }
  return foodCount - 1;
}

function updateScore(diff) {
  gGame.score += diff;
  document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);
  document.getElementById('button-play-again').style.display = 'block';
  document.getElementById('player-status').innerText = 'Game Over!';
}

function restartGame() {
  document.getElementById('player-status').innerText = '';
  document.getElementById('player-score').innerText = 0;
  document.getElementById('button-play-again').style.display = 'none';
  gFoodCount = 0;
  init();
}

function getVictory() {
  document.getElementById('player-status').innerText = 'You Won!';
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);
  document.getElementById('button-play-again').style.display = 'block';
  gFoodCount = 0;
}

function playAgain() {
  document.getElementById('button-play-again').style.display = 'none';
  document.getElementById('player-status').innerText = '';
  document.getElementById('player-score').innerText = 0;
  gFoodCount = 0;
  gGame.score = 0;

  init();
}

function getCherry() {
  var cellRndI = getRandomIntInt(1, 9);
  var cellRndJ = getRandomIntInt(1, 9);

  var runCell = gBoard[cellRndI][cellRndJ];
  var cherryPose = { i: cellRndI, j: cellRndJ };

  if (runCell === EMPTY) {
    gBoard[cellRndI][cellRndJ] = CHERRY;
    renderCell(cherryPose, CHERRY);
  }
}
