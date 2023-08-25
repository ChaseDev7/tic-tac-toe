// Factory function for players in the game.
const Player = (player, selector) => {
  const playerName = player;
  const boardSelector = selector;

  return { playerName, boardSelector }
}

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
  
  const xMarker = document.querySelector("#x-marker");
  xMarker.textContent = player.boardSelector;
  const oMarker = document.querySelector("#o-marker");
  oMarker.textContent = opponent.boardSelector;

  function xSelectIsCurrentPlayer () {
    currentPlayer = xMarker.textContent;
    oMarker.removeEventListener("click", oSelectIsCurrentPlayer);
  }

  function oSelectIsCurrentPlayer () {
    currentPlayer = oMarker.textContent;
    xMarker.removeEventListener("click", xSelectIsCurrentPlayer);
  }

  xMarker.addEventListener("click", xSelectIsCurrentPlayer);

  oMarker.addEventListener("click", oSelectIsCurrentPlayer);
  
  return { gameBoardArray, showGameBoardArray };
})();

// Selects whichever box is clicked on the game board.
const boxSelectedOnBoard = (() => {
  const addSelectedBoxToBoard = () => {
    const boxSelected = document.querySelectorAll(".box");
    console.log(boxSelected);

    boxSelected.forEach((box) => {
      box.addEventListener("click", () => {
        console.log(box.id + " works");
      });
    });
  }
  
  return { addSelectedBoxToBoard }
})();

const gameController = (() => {
  boxSelectedOnBoard.addSelectedBoxToBoard();
})();

console.log(gameBoard.gameBoardArray);