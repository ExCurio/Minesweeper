'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('You hit a Bomb! Game Over!! Please try again!');
        this._board.print();
      } else if (this._board.hasSafeTiles() === false) {
        console.log('You Won! Great Job!! Play again!');
      } else {
        console.log('Current Board: ');
        this._board.print();
      }
    }
  }]);

  return Game;
}();

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
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

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1],
      // 0,0 is reserved for the bomb index
      [0, 1], [1, -1], [1, 0], [1, 1]];
      // A constant equal to the length of the Array bombBoard or the number of nested arrays
      var numberOfRows = this._bombBoard.length;
      // A constant equal to the length of the first nested Array in bombBoard
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      // Checks all neighbors to see if a bomb is present
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        // First check to see if the neighbor is valid or within the board range
        if (neighborRowIndex >= 0 && neighborRowIndex < _this._bombBoard.length && neighborColumnIndex >= 0 && neighborColumnIndex < _this._bombBoard[0].length) {
          // Second check to see if the neighbor has a bomb in it
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            // If the neighbor has a bomb, increment the numberOfBombs counter
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }

    // Method to check to see if there are any safe tiles left - uses a truthy-statement in place of an if-statement

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }

    // Prints to console the Game Board with Board Formatting

  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }

    // Dynamically create the Player's Board given two number parameters

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }

    // Dynamically create the Bomb Board, randomly placing bombs on the board

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      // First, dynamically create the Bomb Board
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(null);
        }
        board.push(row);
      }
      // Second, randomly place bombs on the Bomb Board
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();

var g = new Game(9, 9, 5);

g.playMove(0, 0);