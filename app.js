// Selector for the body element.
const body = document.querySelector("body");

// Factory function for players in the game.
const Player = (player, selector) => {
  const playerName = player;
  const boardSelector = selector;

  return { playerName, boardSelector };
};

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
    board.innerHTML = "";
    boardContainer.appendChild(board);
    showGameBoardArray();
  };
  
  return { gameBoardArray, showGameBoardArray, removeGameBoardArray };
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
  const infoContainer = document.createElement("div");
  infoContainer.setAttribute("id", "winner-info-container");

  // Assigns "X" as the current player.
  function xSelectIsCurrentPlayer () {
    currentPlayer = xMarker.textContent;
    oMarker.removeEventListener("click", oSelectIsCurrentPlayer);
    addSelectedBoxToBoard();
  };

  // Assigns "O" as the current player.
  function oSelectIsCurrentPlayer () {
    currentPlayer = oMarker.textContent;
    xMarker.removeEventListener("click", xSelectIsCurrentPlayer);
    addSelectedBoxToBoard();
  };

  // Selects which player can currently play on the gameboard.
  xMarker.addEventListener("click", xSelectIsCurrentPlayer);
  oMarker.addEventListener("click", oSelectIsCurrentPlayer);

  // Switches between players in between each round.
  const updateCurrentPlayer = () => {
    if (currentPlayer == "X") {
      currentPlayer = "O";
    } else if (currentPlayer == "O") {
      currentPlayer = "X";
    };
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
    let arr = gameBoard.gameBoardArray;
    if (arr[0] === "X" && arr[1] === "X" && arr[2] === "X") {
      winningMessageForPlayer();
    } else if (arr[0] === "X" && arr[3] === "X" && arr[6] === "X") {
      winningMessageForPlayer();
    } else if (arr[2] === "X" && arr[5] === "X" && arr[8] === "X") {
      winningMessageForPlayer();
    } else if (arr[6] === "X" && arr[7] === "X" && arr[8] === "X") {
      winningMessageForPlayer();
    } else if (arr[1] === "X" && arr[4] === "X" && arr[7] === "X") {
      winningMessageForPlayer();
    } else if (arr[3] === "X" && arr[4] === "X" && arr[5] === "X") {
      winningMessageForPlayer();
    } else if (arr[0] === "X" && arr[4] === "X" && arr[8] === "X") {
      winningMessageForPlayer();
    } else if (arr[2] === "X" && arr[4] === "X" && arr[6] === "X") {
      winningMessageForPlayer();
    } else if (arr[0] === "O" && arr[1] === "O" && arr[2] === "O") {
      winningMessageForPlayer();
    } else if (arr[0] === "O" && arr[3] === "O" && arr[6] === "O") {
      winningMessageForPlayer();
    } else if (arr[2] === "O" && arr[5] === "O" && arr[8] === "O") {
      winningMessageForPlayer();
    } else if (arr[6] === "O" && arr[7] === "O" && arr[8] === "O") {
      winningMessageForPlayer();
    } else if (arr[1] === "O" && arr[4] === "O" && arr[7] === "O") {
      winningMessageForPlayer();
    } else if (arr[3] === "O" && arr[4] === "O" && arr[5] === "O") {
      winningMessageForPlayer();
    } else if (arr[0] === "O" && arr[4] === "O" && arr[8] === "O") {
      winningMessageForPlayer();
    } else if (arr[2] === "O" && arr[4] === "O" && arr[6] === "O") {
      winningMessageForPlayer();
    } else if (arr.includes(null)) {
      updateCurrentPlayer();
    } else {
      drawMsgForPlayer();
    }
  };

  // Displays game draw message and button to restart game.
  const drawMsgForPlayer = () => {
    msgBackground.style.display = "flex";
    body.appendChild(msgBackground);
    msgContainer.style.display = "flex";
    body.appendChild(msgContainer);
    msgContainer.appendChild(infoContainer);
    const winner = document.createElement("p");
    winner.setAttribute("id", "game-winner-text");
    winner.style.color = "white";
    winner.textContent = `It's a draw!`;
    infoContainer.appendChild(winner);
    const restartBtn = document.createElement("button");
    restartBtn.classList.add("restart-button");
    restartBtn.textContent = "RESTART";
    infoContainer.appendChild(restartBtn);

    restartBtn.addEventListener("click", restartGame);
  }

  // Displays winning message and which player won the game, plus button to restart game.
  const winningMessageForPlayer = () => {
    msgBackground.style.display = "flex";
    body.appendChild(msgBackground);
    msgContainer.style.display = "flex";
    body.appendChild(msgContainer);
    msgContainer.appendChild(infoContainer);
    const winner = document.createElement("p");
    winner.setAttribute("id", "game-winner-text");
    winner.style.color = "white";
    winner.textContent = `${currentPlayer} wins!`;
    infoContainer.appendChild(winner);
    const restartBtn = document.createElement("button");
    restartBtn.classList.add("restart-button");
    restartBtn.textContent = "RESTART";
    infoContainer.appendChild(restartBtn);

    restartBtn.addEventListener("click", restartGame);
  };

  // After game is over, will reset all variables and functions to default to replay the game.
  const restartGame = () => {
    msgBackground.style.display = "none";
    msgContainer.style.display = "none";
    const winnerText = document.querySelector("#game-winner-text");
    infoContainer.removeChild(winnerText);
    const winnerRestartBtn = document.querySelector(".restart-button");
    infoContainer.removeChild(winnerRestartBtn);
    gameBoard.gameBoardArray = [null, null, null, null, null, null, null, null, null];
    currentPlayer = "";
    addSelectedBoxToBoard();
    gameBoard.removeGameBoardArray();
    xMarker.addEventListener("click", xSelectIsCurrentPlayer);
    oMarker.addEventListener("click", oSelectIsCurrentPlayer);
  };

  // Resets the current game being played if RESET button on screen is clicked.
  const clearGame = () => {
    gameBoard.gameBoardArray = [null, null, null, null, null, null, null, null, null];
    currentPlayer = "";
    addSelectedBoxToBoard();
    gameBoard.removeGameBoardArray();
    xMarker.addEventListener("click", xSelectIsCurrentPlayer);
    oMarker.addEventListener("click", oSelectIsCurrentPlayer);
  };

  // Allows player to click RESET button and restart the game.
  const resetButton = document.querySelector("#reset-button");
  
  resetButton.addEventListener("click", clearGame);

  return { updateCurrentPlayer, addSelectedBoxToBoard };
})();