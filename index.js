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

const winningCombinations = [
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];

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

function gameOverScreen(tileValue) {
  let text = "Draw!";

  if (tileValue !== null) {
    text = `Winner is ${tileValue}`;
  }

  game_result.classList.remove("hidden");
  game_result.classList.add("visible");
  game_result_text.innerText = text;
  gameOverSound.play();
}

function checkWinner() {
  for (const winningCombination of winningCombinations) {
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    /** check for win */
    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike_line.classList.add(strikeClass);
      gameOverScreen(tileValue1);
      return;
    }
  }

  /** check for draw */

  let draw = boardState.every((tile) => tile !== null);

  if (draw) {
    gameOverScreen(null);
  }
}

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
