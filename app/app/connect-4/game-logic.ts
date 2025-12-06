import { Board, Player } from "./types";

const ROWS = 6;
const COLS = 7;

/*
    Game management
*/

// Create an empty Connect 4 board
export function createEmptyBoard(): Board {
    const board: Board = [];
    for (let row = 0; row < ROWS; row++) {
        const row: Array<Player | null> = [];
        for (let col = 0; col < COLS; col++) {
            row.push(null);
        }
        board.push(row);
    }
    return board;
}

// Drop a disc into the specified column for the given player
export function dropDisc(board: Board, col: number, player: Player): { board: Board; row: number } | null {
    // find the lowest empty row in the column
    let row = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][col] === null) {
            row = r;
            break;
        }
    }
    if (row === -1) return null;
    // place the disc
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = player;
    return { board: newBoard, row };
}

// Get a list of valid columns where a disc can be dropped
export function getValidColumns(board: Board): number[] {
    const valid: number[] = [];
    for (let col = 0; col < COLS; col++) {
        if (board[0][col] === null) {
        valid.push(col);
        }
    }
    return valid;
}

// Calculate the winner of the game
export function calculateWinner(board: Board): Player | "draw" | null {
    // directions: right, down, diag down-right, diag up-right
    const dirs = [
        [0, 1],
        [1, 0],
        [1, 1],
        [-1, 1],
    ];
    // check all cells for a connect 4
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const start = board[r][c];
            if (!start) continue;
            // check all directions
            for (const [dr, dc] of dirs) {
                let count = 1;
                for (let k = 1; k < 4; k++) {
                    const nr = r + dr * k;
                    const nc = c + dc * k;
                    // out of bounds or not matching
                    if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== start) break;
                    count++;
                }
                if (count >= 4) return start;
            }
        }
    }
    // draw if all cells filled
    const filled = board.every((row) => row.every((cell) => cell));
    return filled ? "draw" : null;
}

/*
    AI Logic (Minimax with Alpha-Beta Pruning)
*/

type MinimaxResult = {
    col: number | null;
    score: number;
};

type BestMoveOptions = {
    depth?: number;
    validColumns?: number[];
    aiPlayer?: Player;
};

// Get the best move for the AI using minimax algorithm
export function getBestMove(board: Board, options: BestMoveOptions = {}): number {
    
    // default options
    const { depth = 6, validColumns, aiPlayer = "Y" } = options;
    // no valid moves
    const columns = validColumns ?? getValidColumns(board);
    if (columns.length === 0) return -1;
    // determine human player and order columns for better pruning (center first)
    const humanPlayer: Player = aiPlayer === "X" ? "Y" : "X";
    const orderedCols = [...columns].sort(
        (a, b) => Math.abs(COLS / 2 - a) - Math.abs(COLS / 2 - b)
    );

    const { col } = minimax(
        board,
        depth,
        -Infinity,
        Infinity,
        true,
        aiPlayer,
        humanPlayer,
        orderedCols
    );

    // fallback to center column if no move found
    return col ?? orderedCols[Math.floor(orderedCols.length / 2)];
}

// Minimax algorithm with alpha-beta pruning
function minimax(
    board: Board,
    depth: number,
    alpha: number,
    beta: number,
    maximisingPlayer: boolean,
    aiPlayer: Player,
    humanPlayer: Player,
    validColumns: number[] = getValidColumns(board)
): MinimaxResult {
    // check for terminal state
    const winner = calculateWinner(board);
    if (winner === aiPlayer) return { col: null, score: 100000 + depth };
    if (winner === humanPlayer) return { col: null, score: -100000 - depth };
    if (winner === "draw" || validColumns.length === 0) return { col: null, score: 0 };
    if (depth === 0) return { col: null, score: scoreWindow(board, aiPlayer) };
    
    // maximising player (AI)
    if (maximisingPlayer) {
        let bestScore = -Infinity;
        let bestColumn: number | null = null;

        for (const col of validColumns) {
            // simulate move
            const result = dropDisc(board, col, aiPlayer);
            if (!result) continue;
            // evaluate score
            const nextScore = minimax(
                result.board,
                depth - 1,
                alpha,
                beta,
                false,
                aiPlayer,
                humanPlayer
            ).score;
            // update best score and column
            if (nextScore > bestScore) {
                bestScore = nextScore;
                bestColumn = col;
            }

            // alpha-beta pruning
            alpha = Math.max(alpha, bestScore);
            if (alpha >= beta) break;
        }

        return { col: bestColumn, score: bestScore };
    }

    // minimising player (human)
    let bestScore = Infinity;
    let bestColumn: number | null = null;

    for (const col of validColumns) {
        // simulate move
        const result = dropDisc(board, col, humanPlayer);
        if (!result) continue;
        // evaluate score
        const nextScore = minimax(
            result.board,
            depth - 1,
            alpha,
            beta,
            true,
            aiPlayer,
            humanPlayer
        ).score;
        // update best score and column
        if (nextScore < bestScore) {
            bestScore = nextScore;
            bestColumn = col;
        }

        // alpha-beta pruning
        beta = Math.min(beta, bestScore);
        if (alpha >= beta) break;
    }

    return { col: bestColumn, score: bestScore };
}

// Evaluate a 4-cell window for scoring
function evaluateBoard(window: (Player | null)[], aiPlayer: Player): number {
    // count pieces for AI, opponent, and empty cells
    const opponent = aiPlayer === "X" ? "Y" : "X";
    const aiCount = window.filter((c) => c === aiPlayer).length;
    const oppCount = window.filter((c) => c === opponent).length;
    const emptyCount = window.filter((c) => c === null).length;

    // give scores based on counts
    if (aiCount === 4) return 100000;
    if (aiCount === 3 && emptyCount === 1) return 600;
    if (aiCount === 2 && emptyCount === 2) return 50;

    if (oppCount === 3 && emptyCount === 1) return -550;
    if (oppCount === 2 && emptyCount === 2) return -45;

    return 0;
}

function scoreWindow(board: Board, aiPlayer: Player): number {
    let score = 0;

    // center preference
    const centerCol = Math.floor(COLS / 2);
    const centerCount = board.map((r) => r[centerCol]).filter((c) => c === aiPlayer).length;
    score += centerCount * 6;

    // evaluate horizontal window
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
            score += evaluateBoard(board[r].slice(c, c + 4), aiPlayer);
        }
    }

    // evaluate vertical window
    for (let c = 0; c < COLS; c++) {
        for (let r = 0; r <= ROWS - 4; r++) {
            score += evaluateBoard([board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]], aiPlayer);
        }
    }

    // evaluate diagonal windows (top-left to bottom-right)
    for (let r = 0; r <= ROWS - 4; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
            score += evaluateBoard([board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]], aiPlayer);
        }
    }

    // evaluate diagonal windows (bottom-left to top-right)
    for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
            score += evaluateBoard([board[r][c], board[r - 1][c], board[r - 2][c], board[r - 3][c]], aiPlayer);
        }
    }

    return score;
}

