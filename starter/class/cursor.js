const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    // Move cursor up
    if (this.row > 0) {
      this.row--;
    }
  }

  down() {
    // Move cursor down
    if (this.row < this.numRows - 1) {
      this.row++;
    }
  }

  left() {
    // Move cursor left
    if (this.col > 0) {
      this.col--;
    }
  }

  right() {
    // Move cursor right
    if (this.col < this.numCols - 1) {
      this.col++;
    }
  }

}


module.exports = Cursor;
