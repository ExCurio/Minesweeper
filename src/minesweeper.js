// Dynamically create the Player's Board given two number parameters
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let i = 0; i < numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

// Dynamically create the Bomb Board, randomly placing bombs on the board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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
  const numberOfRows = bombBoard.length;
  // A constant equal to the length of the first nested Array in bombBoard
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  // Checks all neighbors to see if a bomb is present
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    // First check to see if the neighbor is valid or within the board range
    if (neighborRowIndex >= 0 && neighborRowIndex < bombBoard.length && neighborColumnIndex >= 0 && neighborColumnIndex < bombBoard[0].length) {
      // Second check to see if the neighbor has a bomb in it
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        // If the neighbor has a bomb, increment the numberOfBombs counter
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  // Checks to see if a tile has been flipped already
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log("This tile has already been flipped!");
    return;
  // Checks to see if the tile has a bomb
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    // If a bomb exists at tile on bombBoard create a bomb on the playerBoard
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

// Prints to console the Game Board with Board Formatting
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

// Test the generateBombBoard, generatePlayerBoard, and printBoard functions
const playerBoard = generatePlayerBoard(3, 4);
const bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

// Test the flipTile and getNumberOfNeighborBombs functions
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);
