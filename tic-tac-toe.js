const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let board;
let scores = {
    X: 0,
    O: 0
};

// create a 3x3 board
function initializeBoard() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
}

// print the board with colors
function printBoard() {
    console.log();
    for (let i = 0; i < 3; i++) {
        const row = board[i].map(cell => {
            if (cell === 'X') return chalk.blue('X');
            if (cell === 'O') return chalk.green('O');
            return cell;
        }).join(' | ');
        console.log(` ${row} `);
        if (i < 2) console.log(chalk.gray('---|---|---'));
    }
    console.log();
}

// check if the current player has won
function checkWin(symbol) {
    for (let i = 0; i < 3; i++) {
        if (board[i].every(cell => cell === symbol)) return true;
        if ([board[0][i], board[1][i], board[2][i]].every(cell => cell === symbol)) return true;
    }
    if ([board[0][0], board[1][1], board[2][2]].every(cell => cell === symbol)) return true;
    if ([board[0][2], board[1][1], board[2][0]].every(cell => cell === symbol)) return true;
    return false;
}

// check if the game is a draw
function isDraw() {
    return board.flat().every(cell => cell !== ' ');
}

// show scores
function showScores(player1, player2) {
    console.log(chalk.magenta(`\n🏆 Scores:`));
    console.log(chalk.blue(`${player1} (X): ${scores.X}`));
    console.log(chalk.green(`${player2} (O): ${scores.O}\n`));
}

// ask if players want to replay
function askReplay(player1, player2) {
    rl.question(chalk.yellow('\nDo you want to play again? (yes/no): '), answer => {
        if (answer.trim().toLowerCase() === 'yes' || answer.trim().toLowerCase() === 'y') {
            console.log(chalk.cyan('\n🎮 Starting a new game...'));
            initializeBoard();
            handleMove(player1, player2, 'X', 'O');
        } else {
            console.log(chalk.yellow('\n👋 Thanks for playing! Final scores:'));
            showScores(player1, player2);
            rl.close();
        }
    });
}

// handle player moves
function handleMove(currentPlayer, nextPlayer, currentSymbol, nextSymbol) {
    printBoard();

    rl.question(`${chalk.yellow(`${currentPlayer} (${currentSymbol})`)}, enter your move (row and column: 1-3 1-3): `, input => {
        const [rowStr, colStr] = input.trim().split(' ');
        const row = parseInt(rowStr, 10) - 1;
        const col = parseInt(colStr, 10) - 1;

        if (
            Number.isInteger(row) && Number.isInteger(col) &&
            row >= 0 && row < 3 && col >= 0 && col < 3
        ) {
            if (board[row][col] === ' ') {
                board[row][col] = currentSymbol;

                if (checkWin(currentSymbol)) {
                    printBoard();
                    console.log(chalk.green(`🎉 Congratulations ${currentPlayer}, you win!`));
                    scores[currentSymbol]++;
                    showScores(currentPlayer, nextPlayer);
                    askReplay(currentPlayer, nextPlayer);
                } else if (isDraw()) {
                    printBoard();
                    console.log(chalk.yellow("🤝 It's a draw!"));
                    showScores(currentPlayer, nextPlayer);
                    askReplay(currentPlayer, nextPlayer);
                } else {
                    handleMove(nextPlayer, currentPlayer, nextSymbol, currentSymbol);
                }
            } else {
                console.log(chalk.red('🚫 That cell is already taken. Try again.'));
                handleMove(currentPlayer, nextPlayer, currentSymbol, nextSymbol);
            }
        } else {
            console.log(chalk.red('❌ Invalid input. Enter two numbers between 1 and 3 separated by a space.'));
            handleMove(currentPlayer, nextPlayer, currentSymbol, nextSymbol);
        }
    });
}

// main function to start the game
function main() {
    console.log(chalk.cyan.bold('🎮 Welcome to 2-Player Tic Tac Toe!\n'));

    rl.question(chalk.yellow('Enter Player 1 name (X): '), player1 => {
        rl.question(chalk.yellow('Enter Player 2 name (O): '), player2 => {
            if (player1.trim().toLowerCase() === player2.trim().toLowerCase()) {
                console.log(chalk.red('\n🚫 Names must be different! Restart the game and enter unique names.'));
                rl.close();
            } else {
                initializeBoard();
                console.log(`\n👋 Hello ${chalk.blue(player1)} and ${chalk.green(player2)}! Let's start.`);
                handleMove(player1, player2, 'X', 'O');
            }
        });
    });
}

// Start the game
main();
