console.log("I'm running rock-paper-scissors");

function playRound(humanChoice, computerChoice, currentRound) {
  console.log(`Round ${currentRound}`);
  console.log(`Human chooses ${humanChoice}`);
  console.log(`Computer chooses ${computerChoice}`);

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

function getHumanChoice(currentRound) {
  //return "Rock";
  return prompt(
    `Please enter Rock, Paper or Scissors for round ${currentRound}`,
    ""
  );
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

function playGame() {
  let humanWins = 0;
  let computerWins = 0;

  for (let round = 1; round <= 5; round++) {
    const humanSelection = getHumanChoice(round);
    const computerSelection = getComputerChoice(round);

    const winner = playRound(humanSelection, computerSelection, round);

    if (winner == "Computer") {
      console.log("Computer Wins Round!");
      computerWins++;
    } else if (winner == "Human") {
      console.log("Human Wins Round");
      humanWins++;
    } else {
      console.log("Round ends in a tie, replay round");
      round--;
      continue;
    }

    if (round == 5 || computerWins == 3 || humanWins == 3) {
      console.log("Game Over");
      if (computerWins > humanWins) {
        console.log(`Computer Wins the Game with ${computerWins}`);
        console.log(`Human loses the game with ${humanWins} wins`);
      } else {
        console.log(`Human Wins the Game with ${humanWins} wins`);
        console.log(`Computer loses the game with ${computerWins} wins`);
      }
      break;
    }
  }
}

playGame();
