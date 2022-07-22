'use strict';
const PACKMAN = '<img class="packman" src="img/packmanRight.png"/>';
var gStrHtmlPackman = '';

var gDeadGhost = [];

var gPackman;
function createPackman(board) {
  gPackman = {
    location: {
      i: 3,
      j: 5,
    },
    isSuper: false,
  };
  board[gPackman.location.i][gPackman.location.j] = PACKMAN;
}

function movePackman(ev) {
  if (!gGame.isOn) return;
  var nextLocation = getNextLocation(ev);

  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  if (nextCell === WALL) return;

  if (nextCell === POWER_FOOD && gPackman.isSuper) return;

  if (nextCell === FOOD || nextCell === POWER_FOOD) {
    updateScore(1);
    gFoodCount--;
  }

  if (nextCell === POWER_FOOD) {
    gPackman.isSuper = true;

    setTimeout(function () {
      gPackman.isSuper = false;

      for (var i = 0; i < gDeadGhost.length; i++) {
        gGhosts.push(gDeadGhost[i]);
      }
      gDeadGhost = [];
    }, 5000);
  }

  if (nextCell === CHERRY) {
    updateScore(10);
  }

  if (gFoodCount === 0) {
    getVictory();
  } else if (nextCell === GHOST) {
    if (gPackman.isSuper === false) {
      gameOver();
      renderCell(gPackman.location, EMPTY);
      return;
    }

    for (var i = 0; i < gGhosts.length; i++) {
      if (
        gGhosts[i].location.i === nextLocation.i &&
        gGhosts[i].location.j === nextLocation.j
      ) {
        gDeadGhost.push(gGhosts.splice(i, 1)[0]);
      }
    }
  }
  // update the model
  gBoard[gPackman.location.i][gPackman.location.j] = EMPTY;

  // update the dom
  renderCell(gPackman.location, EMPTY);

  gPackman.location = nextLocation;

  // update the model
  gBoard[gPackman.location.i][gPackman.location.j] = PACKMAN;
  // update the dom
  renderCell(gPackman.location, gStrHtmlPackman);
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPackman.location.i,
    j: gPackman.location.j,
  };
  switch (eventKeyboard.code) {
    case 'ArrowUp':
      gStrHtmlPackman = '<img class="packman" src="img/packmanUp.png"/>';
      nextLocation.i--;
      break;
    case 'ArrowDown':
      gStrHtmlPackman = '<img class="packman" src="img/packmanDown.png"/>';
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      gStrHtmlPackman = '<img class="packman" src="img/packmanLeft.png"/>';
      nextLocation.j--;
      break;
    case 'ArrowRight':
      gStrHtmlPackman = '<img class="packman" src="img/packmanRight.png"/>';
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}
