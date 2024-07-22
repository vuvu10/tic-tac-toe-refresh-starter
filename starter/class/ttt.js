const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('w', 'move cursor up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('s', 'move cursor down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('a', 'move cursor left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('d', 'move cursor right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('e', 'place move', this.makeMove.bind(this));


    //this.cursor.setBackgroundColor();
    Screen.setMessage(`It's ${this.playerTurn}'s turn!`);
    Screen.render();
  }


  makeMove() {
    if (this.grid[this.cursor.row][this.cursor.col] === ' ') {
      this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);

      const winner = TTT.checkWin(this.grid);
      if (winner) {
        TTT.endGame(winner);
      } else {
        this.playerTurn = this.playerTurn === 'O' ? 'X' : 'O';
        Screen.setMessage(`It's ${this.playerTurn}'s turn!`);
      }

      Screen.render();
      
    }
  }



  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    for (let i = 0; i < 3; i++) {
      if (grid[i][0] !== ' ' && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
        return grid[i][0];
      }
    }


    for (let j = 0; j < 3; j++) {
      if(grid[0][j] !== ' ' && grid[0][j] === grid[1][j] && grid[1][j] === grid[2][j]){
        return grid[0][j];
      }
    }

    if(grid[0][0] !== ' ' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      return grid[0][0];
    }

    if (grid[0][2] !== ' ' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      return grid[0][2];
      
    }
    
    if (grid.every(row => row.every(cell => cell !== ' '))) {
      return 'T';
    }

    return false;



  }
  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
