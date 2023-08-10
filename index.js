const tiles = document.querySelectorAll(".tile");
const PLAYER_X = "X";
const PLAYER_O = "O";

let turn = PLAYER_X;

const boardState = Array(tiles.length).fill(null);
const strike_line = document.getElementById("strike");
const game_result = document.getElementById("game-result");
const game_result_text = document.getElementById("game-result-text");
const restartButton = document.getElementById("btn");
const clickSound = new Audio("../sounds/click.wav");
const gameOverSound = new Audio("../sounds/game_over.wav");

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText() {
  /** remove all hover texts */
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  tiles.forEach((tile) => {
    if (tile.innerText === "") {
      tile.classList.add(`${turn.toLowerCase()}-hover`);
    }
  });
}

setHoverText();

function checkWinner() {}

function tileClick(e) {
  if (game_result.classList.contains("visible")) {
    return;
  }

  const tile = e.target;
  const tileNumber = tile.dataset.index;

  if (tile.innerText !== "") {
    return;
  }

  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X;
    boardState[tileNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O;
    boardState[tileNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }
  setHoverText();
  clickSound.play();
  checkWinner();
}

restartButton.addEventListener("click", () => window.location.reload());
