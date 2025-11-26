import { Board, Player } from "./types";

/*
Winner calculation logic
- Determine if there's a winner, a draw, or the game is still ongoing
*/

// winning combinations
export const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// determine winner and winning line
export const calculateWinnerAndLine = (board: Board): { winner: Player | "draw" | null; line: number[] } => {
    // loop through winning combinations
    for (let i = 0; i < WINNING_LINES.length; i++) {
        const [a, b, c] = WINNING_LINES[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: [a, b, c] };
        }
    }
    // check for draw
    if (board.every((cell) => cell !== null)) {
        return { winner: "draw", line: [] };
    }
    // no winner yet
    return { winner: null, line: [] };
};

/* 
AI logic
- Minimax algorithm with alpha-beta pruning to determine the optimal move for the AI
- The AI plays as "O" and the player as "X"
- Find the best move for the AI
*/

// minimax algorithm with alpha-beta pruning for optimal AI move
export const minimax = (
    board: Board,
    depth: number,
    isMaximising: boolean,
    alpha: number,
    beta: number
): number => {
    const winner = calculateWinnerAndLine(board).winner;

    // base case
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (winner === "draw") return 0;

    // recursive case
    // AI maximising
    if (isMaximising) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = "O";
                const score = minimax(board, depth + 1, false, alpha, beta);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) break; // beta cut-off
            }
        }
        return bestScore;
    }
    // Player minimising
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = "X";
                const score = minimax(board, depth + 1, true, alpha, beta);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) break; // alpha cut-off
            }
        }
        return bestScore;
    }
}

// find the best move for AI
export const findBestMove = (board: Board): number => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = "O";
            const score = minimax(board, 0, false, -Infinity, Infinity);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}