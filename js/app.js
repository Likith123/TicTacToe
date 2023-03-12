const playArea = document.getElementById("playarea");
const info = document.getElementById("info");
const cells = [
    "", "", "", 
    "", "", "", 
    "", "", ""
];
let player = "playerOne";
let dummyOneWins = false, dummyTwoWins = false;
info.textContent = `Player 1 should start the game`;

function clickHandler(e) {
  const playerChoice = document.createElement("div");
  playerChoice.classList.add(player);
  e.target.append(playerChoice);
  player = player === "playerOne" ? "playerTwo" : "playerOne"; // Changing players alternatively
  info.textContent = `Now it is ${player}'s chance`;
  e.target.removeEventListener("click", clickHandler);
  decideWinner(); // Run until a win or draw in game
}

function decideWinner() {
  const allSquares = document.querySelectorAll(".square"); // Selecting all squares

  const winningCombos = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8], // Rows
    [0, 3, 6],[1, 4, 7],[2, 5, 8], // Columns
    [0, 4, 8],[2, 4, 6]            // Diagonals
  ];

  let playerOneWins, playerTwoWins;

  winningCombos.forEach((combo) => {
    // Checking for playerOne win
    playerOneWins = combo.every((cell) =>
      allSquares[cell].firstChild?.classList.contains('playerOne')
    );
    if (playerOneWins) {
      dummyOneWins = true;
      combo.forEach(
        (cell) => {
          allSquares[cell].firstChild.style.borderColor = "green";
          allSquares[cell].firstChild.classList.add("onPlayerOneWin");
      });
      info.textContent = `🎉 Player One Won 🎉`;
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningCombos.forEach((combo) => {
    // Checking for playerTwo win
    playerTwoWins = combo.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("playerTwo")
    );
    if (playerTwoWins) {
      dummyTwoWins = true; 
      combo.forEach((cell) => {
        allSquares[cell].firstChild.classList.add("onPlayerTwoWin");
        // allSquares[cell].firstChild.style.setProperty(
        //   "--cross-pseudo-backgroundcolor",
        //   "green"
        // );
      }
      );
      info.textContent = "🎉 Player Two Won 🎉";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  let count = 0;
  allSquares.forEach((square) => {
    if (square.hasChildNodes()) {
      count++;
    }
    if (!dummyOneWins && !dummyTwoWins && count == 9) {
      info.textContent = "It's a Draw, Try Again!!!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
}

function createBoard() {
  cells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", clickHandler);
    playArea.append(cellElement);
  });
}

createBoard();
