const container = document.querySelector(".container");
const buttonDiv = document.querySelector(".button");

const btnReset = document.createElement("button");
btnReset.textContent = "Reset Board";
btnReset.addEventListener("click", () => {
  resetBoard();
});

const btnUpdate = document.createElement("button");
btnUpdate.textContent = "Update Pen";
btnUpdate.addEventListener("click", () => {
  updateBoard();
});

function createBoard(boardSize = 16) {
  for (let i = 1; i <= boardSize; i++) {
    const boardRow = document.createElement("div");
    for (let j = 1; j <= boardSize; j++) {
      const boardSquare = document.createElement("div");
      boardSquare.classList.add("boardSquare");
      boardSquare.style.width = `${container.clientWidth / boardSize}px`;
      boardSquare.style.height = `${container.clientHeight / boardSize}px`;
      boardSquare.addEventListener("mouseover", (e) => {
        boardSquare.classList.add("etchColor");
      });
      boardRow.appendChild(boardSquare);
    }
    container.appendChild(boardRow);
  }
}

function resetBoard() {
  const boardDivs = container.querySelectorAll(".boardSquare");

  boardDivs.forEach(function (boardSquare) {
    boardSquare.classList = "";
    boardSquare.classList.add("boardSquare");
  });
}

function updateBoard() {
  updateValue = prompt("Enter a new value", "");
  const boardDivs = container.querySelectorAll(".boardSquare");
  boardDivs.forEach(function (boardSquare) {
    boardSquare.remove();
  });

  createBoard(updateValue);
}

buttonDiv.appendChild(btnReset);
buttonDiv.appendChild(btnUpdate);

createBoard();
