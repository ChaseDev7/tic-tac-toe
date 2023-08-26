// Factory function for players in the game.
const Player = (player, selector) => {
  const playerName = player;
  const boardSelector = selector;

  return { playerName, boardSelector }
}

// Creates blank variable, so it can be modified while playing the game.
let currentPlayer = "";

// Individual players created with markers.
const player = Player("Player", "X");
const opponent = Player("Opponent", "O");

//
// Creates the game board with 9 squares to play the game.
//

const gameBoard = (() => {
  // Creates array for storing player selections during game.
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  // Creates the game board.
  const boardContainer = document.querySelector("#board-container");
  const board = document.createElement("div");
  board.setAttribute("id", "game-board");
  boardContainer.appendChild(board);
  let boxNumber = 1;

  // Creates the blocks inside the game board for players to select.
  const showGameBoardArray = () => {
    
    for (i = 0; i < gameBoardArray.length; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.setAttribute("id", "box-" + boxNumber++);
      box.setAttribute("data-box-id", i);
      board.appendChild(box);
    };
  };

  showGameBoardArray();
  
  return { gameBoardArray };
})();

const gameController = (() => {
  const xMarker = document.querySelector("#x-marker");
  xMarker.textContent = player.boardSelector;
  const oMarker = document.querySelector("#o-marker");
  oMarker.textContent = opponent.boardSelector;

  function xSelectIsCurrentPlayer () {
    currentPlayer = xMarker.textContent;
    oMarker.removeEventListener("click", oSelectIsCurrentPlayer);
    addSelectedBoxToBoard();
  }

  function oSelectIsCurrentPlayer () {
    currentPlayer = oMarker.textContent;
    xMarker.removeEventListener("click", xSelectIsCurrentPlayer);
    addSelectedBoxToBoard();
  }

  xMarker.addEventListener("click", xSelectIsCurrentPlayer);

  oMarker.addEventListener("click", oSelectIsCurrentPlayer);

  const updateCurrentPlayer = () => {
    if (currentPlayer == "X") {
      currentPlayer = "O";
    } else if (currentPlayer == "O") {
      currentPlayer = "X";
    }
  };

  const addSelectedBoxToBoard = () => {
    const boxSelected = document.querySelectorAll(".box");

    boxSelected.forEach((box) => {
      box.addEventListener("click", () => {
        console.log(box.id + " works");
        box.textContent = currentPlayer;
        gameBoard.gameBoardArray.splice(box.dataset.boxId, 1, currentPlayer);
        updateCurrentPlayer();
      });
    });
  };

  return { updateCurrentPlayer, addSelectedBoxToBoard }
})();

console.log(gameBoard.gameBoardArray);