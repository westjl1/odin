console.log("I'm running rock-paper-scissors");

const divGame = document.querySelector("#game-div");
const ulGameOutput = document.querySelector("#game-output");
const ulGameInfo = document.querySelector("#game-info");

const btnRock = document.createElement("button");
const btnPaper = document.createElement("button");
const btnScissor = document.createElement("button");

btnRock.textContent = "Rock";
btnRock.id = "Rock";

btnPaper.textContent = "Paper";
btnPaper.id = "Paper";

btnScissor.textContent = "Scissors";
btnScissor.id = "Scissors";

btnRock.addEventListener("click", () => {
  playRound(btnRock.id);
});
btnPaper.addEventListener("click", () => {
  playRound(btnPaper.id);
});
btnScissor.addEventListener("click", () => {
  playRound(btnScissor.id);
});

divGame.appendChild(btnRock);
divGame.appendChild(btnPaper);
divGame.appendChild(btnScissor);

let round = 1;
let computerWins = 0;
let humanWins = 0;
let ties = 0;

function playRound(humanChoice) {
  const computerChoice = getComputerChoice();
  const winner = getWinner(humanChoice, computerChoice);

  writeDom(
    `Round: ${round}  Human chooses ${humanChoice}  Computer chooses ${computerChoice}`
  );

  if (winner == "Computer") {
    writeDom(`Round ${round} winner is ${winner}`);
    computerWins++;
    round++;
  } else if (winner == "Human") {
    writeDom(`Round ${round} winner is ${winner}`);
    humanWins++;
    round++;
  } else {
    writeDom(`Round ends in tie, replay round ${round}`);
    ties++;
  }

  if (round == 6 || computerWins == 3 || humanWins == 3) {
    if (computerWins > humanWins) {
      writeDom(`Game over: Computer Wins the Game with ${computerWins}`);
    } else {
      writeDom(`Game over: Human Wins the Game with ${humanWins}`);
    }
    round = 1;
    computerWins = 0;
    humanWins = 0;
    ties = 0;
  }
}

function writeDom(inText) {
  const infoLi = document.createElement("li");
  infoLi.textContent = inText;
  ulGameInfo.appendChild(infoLi);
}

function getComputerChoice() {
  const randomChoice = getRandomInt(3);
  //console.log(randomChoice);
  switch (randomChoice) {
    case 0:
      return "Rock";
    case 1:
      return "Paper";
    case 2:
      return "Scissors";
    default:
      return "Rock";
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getWinner(humanChoice, computerChoice) {
  //HUMAN ROCK
  if (humanChoice == "Rock" && computerChoice == "Rock") {
    return "Tie";
  } else if (humanChoice == "Rock" && computerChoice == "Scissors") {
    return "Human";
  } else if (humanChoice == "Rock" && computerChoice == "Paper") {
    return "Computer";
  }

  //HUMAN PAPER
  else if (humanChoice == "Paper" && computerChoice == "Paper") {
    return "Tie";
  } else if (humanChoice == "Paper" && computerChoice == "Rock") {
    return "Human";
  } else if (humanChoice == "Paper" && computerChoice == "Scissors") {
    return "Computer";
  }

  //HUMAN SCISSORS
  else if (humanChoice == "Scissors" && computerChoice == "Scissors") {
    return "Tie";
  } else if (humanChoice == "Scissors" && computerChoice == "Paper") {
    return "Human";
  } else if (humanChoice == "Scissors" && computerChoice == "Rock") {
    return "Computer";
  }
}
