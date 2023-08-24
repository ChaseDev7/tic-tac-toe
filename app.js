const gameBoard = (() => {
  // Creates array for storing player selections during game.
  const gameBoardArray = ["X", "X", "O", "X", "O", "X", "X", "O", "O"];

  // Creates the game board.
  const boardContainer = document.querySelector("#board-container");
  const board = document.createElement("div");
  board.setAttribute("id", "game-board");
  boardContainer.appendChild(board);
  let boxNumber = 1;

  // Creates the blocks inside the game board for players to select.
  for (i = 0; i < gameBoardArray.length; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("id", "box-" + boxNumber++);
    box.innerHTML = gameBoardArray[i];
    board.appendChild(box);
  }
  return { gameBoardArray };
})();

// Factory function for players in the game.
const Player = (player, selector) => {
  const playerName = player;
  const boardSelector = selector;
  return { playerName, boardSelector }
}

// Individual players created with markers.
const player = Player("Player", "X");
const opponent = Player("Opponent", "O");

console.log(player.playerName);
console.log(player.boardSelector);

// Activates whichever box is selected on the game board.
(() => {
  Array.from(document.getElementsByClassName("box"))
    .forEach(function(element){
      element.addEventListener("click", function() {
        const boxID = element;
        console.log(`${boxID.id} selected.`);
      });
    });
})();

const gameController = (() => {
  console.log("Controller for game.");
})();

console.log(gameBoard.gameBoardArray);