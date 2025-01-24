const readline = require('readline');

// Create a 3x3 empty board
let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

// Function to print the board
function printBoard() {
    console.log(`\n ${board[0][0]} | ${board[0][1]} | ${board[0][2]} `);
    console.log('---|---|---');
    console.log(` ${board[1][0]} | ${board[1][1]} | ${board[1][2]} `);
    console.log('---|---|---');
    console.log(` ${board[2][0]} | ${board[2][1]} | ${board[2][2]} \n`);
}

// Function to check for a winner
function checkWinner(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
    return false;
}

// Function to check if the board is full (draw)
function isDraw() {
    return board.flat().every(cell => cell !== ' ');
}

// Function for the CPU to make a move (random available spot)
function cpuMove() {
    let availableMoves = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                availableMoves.push([i, j]);
            }
        }
    }
    if (availableMoves.length > 0) {
        let [row, col] = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        board[row][col] = 'O';
        console.log(`CPU placed "O" at ${row + 1} ${col + 1}`);
    }
}

// Function to handle player's move
function playerMove(playerName) {
    printBoard();
    rl.question(`${playerName}, enter your move (row and column: 1-3 1-3): `, (input) => {
        let [row, col] = input.split(' ').map(num => parseInt(num) - 1);

        if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === ' ') {
            board[row][col] = 'X';

            if (checkWinner('X')) {
                printBoard();
                console.log(`🎉 Congratulations ${playerName}, you win!`);
                rl.close();
                return;
            }

            if (isDraw()) {
                printBoard();
                console.log("It's a draw!");
                rl.close();
                return;
            }

            console.log("CPU's turn...");
            cpuMove();

            if (checkWinner('O')) {
                printBoard();
                console.log('💻 CPU wins! Better luck next time!');
                rl.close();
                return;
            }

            if (isDraw()) {
                printBoard();
                console.log("It's a draw!");
                rl.close();
                return;
            }

            playerMove(playerName);
        } else {
            console.log('Invalid move! Try again.');
            playerMove(playerName);
        }
    });
}

// Start the game with player name input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Welcome to Tic Tac Toe vs CPU');
rl.question('Enter your name: ', (playerName) => {
    console.log(`Hello, ${playerName}! You are playing as "X", and the CPU is "O".`);
    playerMove(playerName);
});
