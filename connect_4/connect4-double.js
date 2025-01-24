const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ROWS = 6;
const COLS = 7;
const EMPTY = '.';

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
let players = { X: 'Player 1', O: 'Player 2' };
let currentPlayer = 'X';

function printBoard() {
  console.clear();
  board.forEach(row => console.log(row.join(' ')));
  console.log('1 2 3 4 5 6 7');
}

function dropDisc(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === EMPTY) {
      board[row][col] = currentPlayer;
      return true;
    }
  }
  return false;
}

function checkWin() {
  function checkDirection(row, col, deltaRow, deltaCol) {
    let count = 0;
    for (let i = 0; i < 4; i++) {
      if (
        row >= 0 && row < ROWS && col >= 0 && col < COLS &&
        board[row][col] === currentPlayer
      ) {
        count++;
      } else {
        break;
      }
      row += deltaRow;
      col += deltaCol;
    }
    return count === 4;
  }

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (
        checkDirection(row, col, 0, 1) ||  // Horizontal
        checkDirection(row, col, 1, 0) ||  // Vertical
        checkDirection(row, col, 1, 1) ||  // Diagonal \ 
        checkDirection(row, col, 1, -1)    // Diagonal /
      ) {
        return true;
      }
    }
  }
  return false;
}

function playTurn() {
  printBoard();
  rl.question(`${players[currentPlayer]}, choose a column (1-7): `, (input) => {
    const col = parseInt(input) - 1;
    if (isNaN(col)) {
      console.log('Error: Input must be a number between 1 and 7.');
      playTurn();
      return;
    }
    if (col < 0 || col >= COLS) {
      console.log('Error: Column out of range. Choose between 1 and 7.');
      playTurn();
      return;
    }
    if (!dropDisc(col)) {
      console.log('Error: Column is full. Try another one.');
      playTurn();
      return;
    }
    if (checkWin()) {
      printBoard();
      console.log(`${players[currentPlayer]} wins!`);
      rl.close();
      return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playTurn();
  });
}

console.log('Welcome to Connect 4!');
rl.question('Enter name for Player 1 (X): ', (name1) => {
  players.X = name1 || 'Player 1';
  rl.question('Enter name for Player 2 (O): ', (name2) => {
    players.O = name2 || 'Player 2';
    playTurn();
  });
});
