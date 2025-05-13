const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ROWS = 6;
const COLS = 7;
const EMPTY = ' ';
let board;
let players = { X: 'Player 1', O: 'Player 2' };
let currentPlayer = 'X';
let scores = { X: 0, O: 0 };

// Initialize the board
function initializeBoard() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

// Print the board with colors
function printBoard() {
  console.clear();
  console.log(chalk.bold('🎮 CONNECT 4\n'));
  for (let row of board) {
    const rowString = row.map(cell => {
      if (cell === 'X') return chalk.blue('●');
      if (cell === 'O') return chalk.yellow('●');
      return chalk.gray('·');
    }).join(' ');
    console.log(` ${rowString}`);
  }
  console.log(chalk.gray(' 1 2 3 4 5 6 7'));
  console.log();
  console.log(`${chalk.blue(players.X)}: ${scores.X}   ${chalk.yellow(players.O)}: ${scores.O}\n`);
}

// Drop a disc in the specified column
function dropDisc(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === EMPTY) {
      board[row][col] = currentPlayer;
      return true;
    }
  }
  return false;
}

// Check for a win
function checkWin() {
  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1]
  ];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== currentPlayer) continue;
      for (let [dr, dc] of directions) {
        let count = 0;
        for (let i = 0; i < 4; i++) {
          const nr = r + dr * i, nc = c + dc * i;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === currentPlayer) {
            count++;
          } else break;
        }
        if (count === 4) return true;
      }
    }
  }
  return false;
}

// Check for a draw
function isDraw() {
  return board.every(row => row.every(cell => cell !== EMPTY));
}

// Switch players
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Ask if players want to replay
function askReplay() {
  rl.question(chalk.cyan('\nDo you want to play again? (yes/no): '), answer => {
    if (answer.trim().toLowerCase() === 'yes' || answer.trim().toLowerCase() === 'y') {
      initializeBoard();
      currentPlayer = 'X';
      playTurn();
    } else {
      console.log(chalk.green('\nThanks for playing! 👋'));
      rl.close();
    }
  });
}

// Main game loop
function playTurn() {
  printBoard();
  rl.question(`${chalk.cyan(players[currentPlayer])} (${currentPlayer === 'X' ? chalk.blue('●') : chalk.yellow('●')}), choose a column (1-7): `, input => {
    const col = parseInt(input) - 1;

    if (isNaN(col) || col < 0 || col >= COLS) {
      console.log(chalk.red('❌ Invalid column. Enter a number from 1 to 7.'));
      return setTimeout(playTurn, 1000);
    }

    if (!dropDisc(col)) {
      console.log(chalk.red('🚫 Column full. Try another one.'));
      return setTimeout(playTurn, 1000);
    }

    if (checkWin()) {
      printBoard();
      console.log(chalk.green(`🏆 ${players[currentPlayer]} wins!`));
      scores[currentPlayer]++;
      return askReplay();
    }

    if (isDraw()) {
      printBoard();
      console.log(chalk.yellow("It's a draw!"));
      return askReplay();
    }

    switchPlayer();
    playTurn();
  });
}

// Main function to start the game
function main() {
  console.log(chalk.bold.cyan('🧩 Welcome to Connect 4!'));

  rl.question('Enter name for Player 1 (X): ', name1 => {
    players.X = name1.trim() || 'Player 1';

    rl.question('Enter name for Player 2 (O): ', name2 => {
      players.O = name2.trim() || 'Player 2';

      initializeBoard();
      playTurn();
    });
  });
}

main();
