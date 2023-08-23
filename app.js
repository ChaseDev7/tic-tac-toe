const gameBoard = (() => {
  const gameboardArray = ["", "", "", "", "", "", "", "", ""];
  const boardContainer = document.querySelector("#board-container");
  const board = document.createElement("div");
  board.setAttribute("id", "game-board");
  boardContainer.appendChild(board);
  return { gameboardArray };
})();

console.log(gameBoard.gameboardArray);