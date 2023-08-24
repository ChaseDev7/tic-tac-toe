const gameBoard = (() => {
  // Creates array for storing player selections during game.
  const gameboardArray = ["", "", "", "", "", "", "", "", ""];

  // Creates the game board and all the blocks inside of it.
  const boardContainer = document.querySelector("#board-container");
  const board = document.createElement("div");
  board.setAttribute("id", "game-board");
  boardContainer.appendChild(board);
  let boxNumber = 1;

  for (i = 0; i < gameboardArray.length; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("id", "box-" + boxNumber++);
    board.appendChild(box);
  }
  return { gameboardArray };
})();

const Player = (player, selector) => {
  const playerName = player;
  const boardSelector = selector;
  return { playerName, boardSelector }
}

// ADD FUNCTION INSTEAD OF ARGUMENT ONCE PLAYER SELECTED.
const player = Player("Player", "X");
const opponent = Player("Opponent", "O");

console.log(batman.playerName);
console.log(batman.boardSelector);

Array.from(document.getElementsByClassName("box"))
  .forEach(function(element){
    element.addEventListener("click", function() {
      const boxID = element;
      console.log(`${boxID} selected.`);
      console.log(element);
    });
  });


console.log(gameBoard.gameboardArray);