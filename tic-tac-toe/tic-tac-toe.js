// This is a factory function that will create a tic-tac-toe game board
// Each cell will start with a value of 0,
// which means it is empty
function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const placePlayerMark = (row, column, player) => {
    //Only place the mark if the cell is empty
    if (board[row][column].getValue() === "") {
      board[row][column].placeMark(player);
    }
  };

  const winner = () => {
    // Check rows
    for (let i = 0; i < rows; i++) {
      if (
        board[i][0].getValue() !== "" &&
        board[i][0].getValue() === board[i][1].getValue() &&
        board[i][1].getValue() === board[i][2].getValue()
      ) {
        return board[i][0].getValue();
      }
    }

    // Check columns
    for (let j = 0; j < columns; j++) {
      if (
        board[0][j].getValue() !== "" &&
        board[0][j].getValue() === board[1][j].getValue() &&
        board[1][j].getValue() === board[2][j].getValue()
      ) {
        return board[0][j].getValue();
      }
    }

    // Check diagonals
    if (
      board[0][0].getValue() !== "" &&
      board[0][0].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[2][2].getValue()
    ) {
      return board[0][0].getValue();
    }

    if (
      board[0][2].getValue() !== "" &&
      board[0][2].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[2][0].getValue()
    ) {
      return board[0][2].getValue();
    }

    return "";
  };

  const boardFull = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (board[i][j].getValue() === "") {
          return false;
        }
      }
    }
    return true;
  };

  // For debugging purposes: print the board to the console
  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return {
    getBoard,
    placePlayerMark,
    winner,
    boardFull,
    printBoard,
  };
}

function Cell() {
  let value = "";

  // Accept a player's mark to change the value of the cell
  const placeMark = (player) => {
    value = player;
  };

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {
    getValue,
    placeMark,
  };
}

/*
 ** The GameController will be responsible for controlling the
 ** flow and state of the game's turns, as well as whether
 ** anybody has won the game or if it's a tie.
 */
function GameController(playerOneName = "X", playerTwoName = "O") {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      mark: "X",
    },
    {
      name: playerTwoName,
      mark: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    // Try to place mark for the current player
    // For debugging purposes, we log the attempt
    console.log(
      `Trying to place ${
        getActivePlayer().name
      }'s mark into row ${row}, column ${column}...`
    );

    if (board.getBoard()[row][column].getValue() === "") {
      board.placePlayerMark(row, column, getActivePlayer().mark);
    } else {
      // For debugging purposes:
      console.log("Cell already occupied! Try again.");
      return;
    }

    //For debugging purposes, check for a winner or tie after each round
    if (board.winner() !== "") {
      board.printBoard();
      console.log(`${getActivePlayer().name} wins!`);
      return;
    }

    //For debugging purposes, check for a tie
    if (board.boardFull()) {
      board.printBoard();
      console.log("It's a tie!");
      return;
    }

    switchPlayerTurn();
    printNewRound();
  };

  // Initial play game messages for debugging purposes
  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    winner: board.winner,
    boardFull: board.boardFull,
  };
}

function ScreenController() {
  const game = GameController();

  const gameHeaderDiv = document.querySelector(".game-header");
  const boardDiv = document.querySelector(".game-board");
  const gameFooterDiv = document.querySelector(".game-footer");

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const winner = game.winner();
    const boardFull = game.boardFull();
    const activePlayer = game.getActivePlayer();

    if (winner !== "") {
      gameHeaderDiv.textContent = `${activePlayer.name} wins!`;
    } else if (boardFull) {
      gameHeaderDiv.textContent = "It's a tie!";
    } else {
      gameHeaderDiv.textContent = `${activePlayer.name}'s turn...`;
    }

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function
        cellButton.dataset.column = columnIndex;
        cellButton.dataset.row = rowIndex;

        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });

    // Add event listener for the board
    function handleBoardClick(e) {      
      const selectedRow = e.target.dataset.row;
      const selectedColumn = e.target.dataset.column;
      // Make sure I've clicked a column and not the gaps in between
      if (!selectedColumn || !selectedRow) return;

      game.playRound(selectedRow, selectedColumn);

      updateScreen();
    }
    boardDiv.addEventListener("click", handleBoardClick);
  };
  // Initial render
  updateScreen();
}

ScreenController();
