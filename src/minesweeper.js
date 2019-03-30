class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('You hit a Bomb! Game Over!! Please try again!');
      this._board.print();
    } else if (this._board.hasSafeTiles() === false) {
      console.log('You Won! Great Job!! Play again!')
    } else {
      console.log('Current Board: ');
      this._board.print();
    }
  }

}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    // Checks to see if a tile has been flipped already
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log("This tile has already been flipped!");
      return;
    // Checks to see if the tile has a bomb
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      // If a bomb exists at tile on bombBoard create a bomb on the playerBoard
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  // Method that gets the number of neigbor bombs
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      // 0,0 is reserved for the bomb index
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    // A constant equal to the length of the Array bombBoard or the number of nested arrays
    const numberOfRows = this._bombBoard.length;
    // A constant equal to the length of the first nested Array in bombBoard
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    // Checks all neighbors to see if a bomb is present
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      // First check to see if the neighbor is valid or within the board range
      if (neighborRowIndex >= 0 && neighborRowIndex < this._bombBoard.length && neighborColumnIndex >= 0 && neighborColumnIndex < this._bombBoard[0].length) {
        // Second check to see if the neighbor has a bomb in it
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          // If the neighbor has a bomb, increment the numberOfBombs counter
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  // Method to check to see if there are any safe tiles left - uses a truthy-statement in place of an if-statement
  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  // Prints to console the Game Board with Board Formatting
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // Dynamically create the Player's Board given two number parameters
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  // Dynamically create the Bomb Board, randomly placing bombs on the board
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    // First, dynamically create the Bomb Board
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(null);
      }
      board.push(row);
    }
    // Second, randomly place bombs on the Bomb Board
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }

}

const g = new Game(9, 9, 5);

g.playMove(0,0);
