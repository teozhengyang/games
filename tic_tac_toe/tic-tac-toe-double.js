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

// Function to handle a player's move
function playerMove(currentPlayer, nextPlayer, currentSymbol, nextSymbol) {
    printBoard();
    rl.question(`${currentPlayer}, enter your move (row and column: 1-3 1-3): `, (input) => {
        let [row, col] = input.split(' ').map(num => parseInt(num) - 1);

        if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === ' ') {
            board[row][col] = currentSymbol;

            if (checkWinner(currentSymbol)) {
                printBoard();
                console.log(`🎉 Congratulations ${currentPlayer}, you win!`);
                rl.close();
                return;
            }

            if (isDraw()) {
                printBoard();
                console.log("It's a draw!");
                rl.close();
                return;
            }

            playerMove(nextPlayer, currentPlayer, nextSymbol, currentSymbol);
        } else {
            console.log('Invalid move! Try again.');
            playerMove(currentPlayer, nextPlayer, currentSymbol, nextSymbol);
        }
    });
}

// Start the game with player names input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Welcome to 2-Player Tic Tac Toe!');

rl.question('Enter Player 1 name (X): ', (player1) => {
    rl.question('Enter Player 2 name (O): ', (player2) => {
        if (player1.toLowerCase() === player2.toLowerCase()) {
            console.log('Names must be different! Restart the game and enter unique names.');
            rl.close();
        } else {
            console.log(`\nHello ${player1} and ${player2}! Let's start.`);
            playerMove(player1, player2, 'X', 'O');
        }
    });
});
