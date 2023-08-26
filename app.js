// Selector for the body element.
const body = document.querySelector("body");

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
  const gameBoardArray = [null, null, null, null, null, null, null, null, null];

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

  const removeGameBoardArray = () => {
    boardContainer.removeChild(board);

    showNewGameBoardArray();
  };

  const showNewGameBoardArray = () => {
    const newBoard = document.createElement("div");
    newBoard.setAttribute("id", "game-board");
    boardContainer.appendChild(newBoard);
    let boxNumber = 1;

    for (i = 0; i < gameBoardArray.length; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.setAttribute("id", "box-" + boxNumber++);
      box.setAttribute("data-box-id", i);
      newBoard.appendChild(box);
    };

    return { showNewGameBoardArray }
  };
  
  return { gameBoardArray, showGameBoardArray, removeGameBoardArray, showNewGameBoardArray };
})();

const gameController = (() => {
  // Assigns the selectors once player picks one or the other.
  const xMarker = document.querySelector("#x-marker");
  xMarker.textContent = player.boardSelector;
  const oMarker = document.querySelector("#o-marker");
  oMarker.textContent = opponent.boardSelector;

  // Creates variables for winning message.
  const msgContainer = document.querySelector("#message-container");
  const msgBackground = document.querySelector("#winner-message-bg");

  // Assigns "X" as the current player.
  function xSelectIsCurrentPlayer () {
    currentPlayer = xMarker.textContent;
    oMarker.removeEventListener("click", oSelectIsCurrentPlayer);
    addSelectedBoxToBoard();
  }

  // Assigns "O" as the current player.
  function oSelectIsCurrentPlayer () {
    currentPlayer = oMarker.textContent;
    xMarker.removeEventListener("click", xSelectIsCurrentPlayer);
    addSelectedBoxToBoard();
  }

  // Selects which player can currently play on the gameboard.
  xMarker.addEventListener("click", xSelectIsCurrentPlayer);
  oMarker.addEventListener("click", oSelectIsCurrentPlayer);

  // Switches between players in between each round.
  const updateCurrentPlayer = () => {
    if (currentPlayer == "X") {
      currentPlayer = "O";
    } else if (currentPlayer == "O") {
      currentPlayer = "X";
    }
  };

  const addSelectedBoxToBoard = () => {
    const boxSelected = document.querySelectorAll(".box");
    boxSelected.textContent = "";

    boxSelected.forEach((box) => {
      box.addEventListener("click", function addPlayerToBoxSelected () {
        box.textContent = currentPlayer;
        gameBoard.gameBoardArray.splice(box.dataset.boxId, 1, currentPlayer);
        if (gameBoard.gameBoardArray[box.dataset.boxId] !== null) {
          box.removeEventListener("click", addPlayerToBoxSelected);
        };
        checkForGameWin();
      });
    });
  };

  // Looks to see if any of the winning conditions are met.
  const checkForGameWin = () => {
    if (gameBoard.gameBoardArray[0] === "X" && gameBoard.gameBoardArray[1] === "X" && gameBoard.gameBoardArray[2] === "X") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[0] === "X" && gameBoard.gameBoardArray[3] === "X" && gameBoard.gameBoardArray[6] === "X") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[2] === "X" && gameBoard.gameBoardArray[5] === "X" && gameBoard.gameBoardArray[8] === "X") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[6] === "X" && gameBoard.gameBoardArray[7] === "X" && gameBoard.gameBoardArray[8] === "X") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[1] === "X" && gameBoard.gameBoardArray[4] === "X" && gameBoard.gameBoardArray[7] === "X") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[3] === "X" && gameBoard.gameBoardArray[4] === "X" && gameBoard.gameBoardArray[5] === "X") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[0] === "X" && gameBoard.gameBoardArray[4] === "X" && gameBoard.gameBoardArray[8] === "X") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[2] === "X" && gameBoard.gameBoardArray[4] === "X" && gameBoard.gameBoardArray[6] === "X") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[0] === "O" && gameBoard.gameBoardArray[1] === "O" && gameBoard.gameBoardArray[2] === "O") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[0] === "O" && gameBoard.gameBoardArray[3] === "O" && gameBoard.gameBoardArray[6] === "O") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[2] === "O" && gameBoard.gameBoardArray[5] === "O" && gameBoard.gameBoardArray[8] === "O") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[6] === "O" && gameBoard.gameBoardArray[7] === "O" && gameBoard.gameBoardArray[8] === "O") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[1] === "O" && gameBoard.gameBoardArray[4] === "O" && gameBoard.gameBoardArray[7] === "O") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[3] === "O" && gameBoard.gameBoardArray[4] === "O" && gameBoard.gameBoardArray[5] === "O") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[0] === "O" && gameBoard.gameBoardArray[4] === "O" && gameBoard.gameBoardArray[8] === "O") {
      winningMessageForPlayer();
    } else if (gameBoard.gameBoardArray[2] === "O" && gameBoard.gameBoardArray[4] === "O" && gameBoard.gameBoardArray[6] === "O") {
      winningMessageForPlayer();
    } else {
      updateCurrentPlayer();
    }
  };

  // Displays winning message and which player won the game.
  const winningMessageForPlayer = () => {
    msgBackground.style.display = "flex";
    body.appendChild(msgBackground);
    msgContainer.style.display = "flex";
    body.appendChild(msgContainer);
    const winner = document.createElement("p");
    winner.style.color = "white";
    winner.style.fontSize = "25px";
    winner.textContent = `${currentPlayer} wins!`;
    msgContainer.appendChild(winner);
    const restartBtn = document.createElement("button");
    restartBtn.classList.add("restart-button");
    restartBtn.textContent = "RESTART";
    msgContainer.appendChild(restartBtn);

    restartBtn.addEventListener("click", restartGame);
  }

  const restartGame = () => {
    msgBackground.style.display = "none";
    msgContainer.style.display = "none";
    gameBoard.gameBoardArray = [null, null, null, null, null, null, null, null, null];
    currentPlayer = "";
    addSelectedBoxToBoard();
    gameBoard.removeGameBoardArray();
  }

  return { updateCurrentPlayer, addSelectedBoxToBoard };
})();

console.log(gameBoard.gameBoardArray);