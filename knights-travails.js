class Board {
  constructor() {
    this.visitedLocations = new Set();
    this.routes = [];
  }

  reset() {
    this.visitedLocations = new Set();
    this.routes = [];
  }

  knightMoves(from = [0, 0], to = [7, 7]) {
    const q = [[from]];

    this.visitedLocations.add(JSON.stringify(from));

    while (q.length > 0) {
      const currentRoute = q.shift();
      const currentSquare = currentRoute[currentRoute.length - 1];

      if (currentSquare[0] === to[0] && currentSquare[1] === to[1]) {
        console.log(
          `You made it in ${currentRoute.length - 1} moves! Here's your path:`
        );
        currentRoute.forEach((square) => console.log(square));
        return currentRoute; // Return the route
      }

      const possMoves = this.possibleMoves(currentSquare[0], currentSquare[1]);
      for (const move of possMoves) {
        const nextSquare = [move[0], move[1]];
        this.visitedLocations.add(JSON.stringify(nextSquare));
        const newRoute = [...currentRoute, nextSquare];
        q.push(newRoute);
      }
    }
    return null; //None found
  }

  possibleMoves(fromX, fromY) {
    let q = [];
    q.push({ x: fromX + 1, y: fromY + 2 });
    q.push({ x: fromX + 2, y: fromY + 1 });
    q.push({ x: fromX - 1, y: fromY - 2 });
    q.push({ x: fromX - 2, y: fromY - 1 });
    q.push({ x: fromX + 1, y: fromY - 2 });
    q.push({ x: fromX - 1, y: fromY + 2 });
    q.push({ x: fromX + 2, y: fromY - 1 });
    q.push({ x: fromX - 2, y: fromY + 1 });

    let validMoves = [];
    while (q.length > 0) {
      let checkSquare = q.shift();
      if (
        checkSquare.x >= 0 &&
        checkSquare.x <= 7 &&
        checkSquare.y >= 0 &&
        checkSquare.y <= 7 &&
        !this.visitedLocations.has(
          JSON.stringify([checkSquare.x, checkSquare.y])
        )
      ) {
        validMoves.push([checkSquare.x, checkSquare.y]);
      }
    }

    return validMoves;

    //Possible move 1
    //fromX + 1 : if x < 7
    //fromY + 2 : if y < 6
    //Possible move 2
    //fromX + 2 : if x < 6
    //fromY + 1 : if y < 7
    //Possible move 3
    //fromX - 1 : if x > 0
    //fromY - 2 : if y > 1
    //Possible move 4
    //fromX - 2 : if x > 1
    //fromY - 1 : if y > 0
    //Possible move 5
    //fromX + 1 : if x < 7
    //fromY - 2 : if y > 1
    //Possible move 6
    //fromX - 1 : if x > 0
    //fromY + 2 : if y < 6
    //Possible move 7
    //fromX + 2 : if x < 6
    //fromY - 1 : if y > 0
    //Possible move 8
    //fromX - 2 : if x > 1
    //fromY + 1 : if y < 7
  }
}

const myBoard = new Board();
myBoard.knightMoves();
