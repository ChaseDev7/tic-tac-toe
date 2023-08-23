const gameBoard = (() => {
  // Creates array for storing player selections during game.
  const gameboardArray = ["", "", "", "", "", "", "", "", ""];

  // Creates the game board and all the blocks inside of it.
  const boardContainer = document.querySelector("#board-container");
  const board = document.createElement("div");
  board.setAttribute("id", "game-board");
  boardContainer.appendChild(board);

  for (i = 0; i < gameboardArray.length; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("id", "box " + i);
    board.appendChild(box);
  }
  return { gameboardArray };
})();

console.log(gameBoard.gameboardArray);