import { Board, COLS, Piece, PieceType, Position, ROWS, Side } from "./types";

// Piece display order for captured pieces
export const PIECE_DISPLAY_ORDER: PieceType[] = ["king", "queen", "rook", "bishop", "knight", "pawn"];

// Create initial chess board setup
export function createInitialBoard(): Board {
    const board: Board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    const createPiece = (row: number, col: number, type: PieceType, side: Side): Piece => ({
        id: `${side}-${type}-${row}-${col}`,
        side,
        type,
        hasMoved: false,
    });

    // Back rank setup
    const backRank: PieceType[] = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

    backRank.forEach((type, col) => {
        board[0][col] = createPiece(0, col, type, "black");
        board[7][col] = createPiece(7, col, type, "white");
    });

    // Pawns
    for (let col = 0; col < COLS; col++) {
        board[1][col] = createPiece(1, col, "pawn", "black");
        board[6][col] = createPiece(6, col, "pawn", "white");
    }

    return board;
}

// Check if position is inside board
export function isInsideBoard({ row, col }: Position): boolean {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
}

// Get piece at position
export function getPiece(board: Board, position: Position): Piece | null {
    if (!isInsideBoard(position)) return null;
    return board[position.row][position.col];
}

// Clone board
function cloneBoard(board: Board): Board {
    return board.map((row) => row.map((piece) => (piece ? { ...piece } : null)));
}

// Find king position
function findKing(board: Board, side: Side): Position | null {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const piece = board[row][col];
            if (piece && piece.type === "king" && piece.side === side) {
                return { row, col };
            }
        }
    }
    return null;
}

// Get possible moves for pawn
function getPawnMoves(board: Board, position: Position, piece: Piece): Position[] {
    const moves: Position[] = [];
    const direction = piece.side === "white" ? -1 : 1;
    const startRow = piece.side === "white" ? 6 : 1;

    // Move forward one square
    const forward = { row: position.row + direction, col: position.col };
    if (isInsideBoard(forward) && !getPiece(board, forward)) {
        moves.push(forward);

        // Move forward two squares from starting position
        if (position.row === startRow) {
            const doubleForward = { row: position.row + 2 * direction, col: position.col };
            if (isInsideBoard(doubleForward) && !getPiece(board, doubleForward)) {
                moves.push(doubleForward);
            }
        }
    }

    // Capture diagonally
    const captureLeft = { row: position.row + direction, col: position.col - 1 };
    const captureRight = { row: position.row + direction, col: position.col + 1 };

    if (isInsideBoard(captureLeft)) {
        const target = getPiece(board, captureLeft);
        if (target && target.side !== piece.side) {
            moves.push(captureLeft);
        }
    }

    if (isInsideBoard(captureRight)) {
        const target = getPiece(board, captureRight);
        if (target && target.side !== piece.side) {
            moves.push(captureRight);
        }
    }

    return moves;
}

// Get possible moves for knight
function getKnightMoves(position: Position): Position[] {
    const offsets = [
        { dr: -2, dc: -1 },
        { dr: -2, dc: 1 },
        { dr: -1, dc: -2 },
        { dr: -1, dc: 2 },
        { dr: 1, dc: -2 },
        { dr: 1, dc: 2 },
        { dr: 2, dc: -1 },
        { dr: 2, dc: 1 },
    ];

    return offsets
        .map(({ dr, dc }) => ({ row: position.row + dr, col: position.col + dc }))
        .filter((pos) => isInsideBoard(pos));
}

// Get possible moves for bishop
function getBishopMoves(board: Board, position: Position): Position[] {
    const moves: Position[] = [];
    const directions = [
        { dr: -1, dc: -1 },
        { dr: -1, dc: 1 },
        { dr: 1, dc: -1 },
        { dr: 1, dc: 1 },
    ];

    for (const { dr, dc } of directions) {
        let row = position.row + dr;
        let col = position.col + dc;

        while (isInsideBoard({ row, col })) {
            const target = getPiece(board, { row, col });
            if (!target) {
                moves.push({ row, col });
            } else {
                moves.push({ row, col });
                break;
            }
            row += dr;
            col += dc;
        }
    }

    return moves;
}

// Get possible moves for rook
function getRookMoves(board: Board, position: Position): Position[] {
    const moves: Position[] = [];
    const directions = [
        { dr: -1, dc: 0 },
        { dr: 1, dc: 0 },
        { dr: 0, dc: -1 },
        { dr: 0, dc: 1 },
    ];

    for (const { dr, dc } of directions) {
        let row = position.row + dr;
        let col = position.col + dc;

        while (isInsideBoard({ row, col })) {
            const target = getPiece(board, { row, col });
            if (!target) {
                moves.push({ row, col });
            } else {
                moves.push({ row, col });
                break;
            }
            row += dr;
            col += dc;
        }
    }

    return moves;
}

// Get possible moves for queen (combination of rook and bishop)
function getQueenMoves(board: Board, position: Position): Position[] {
    return [...getRookMoves(board, position), ...getBishopMoves(board, position)];
}

// Get possible moves for king
function getKingMoves(position: Position): Position[] {
    const offsets = [
        { dr: -1, dc: -1 },
        { dr: -1, dc: 0 },
        { dr: -1, dc: 1 },
        { dr: 0, dc: -1 },
        { dr: 0, dc: 1 },
        { dr: 1, dc: -1 },
        { dr: 1, dc: 0 },
        { dr: 1, dc: 1 },
    ];

    return offsets
        .map(({ dr, dc }) => ({ row: position.row + dr, col: position.col + dc }))
        .filter((pos) => isInsideBoard(pos));
}

// Get all pseudo-legal moves (before checking for check)
function getPseudoLegalMoves(board: Board, position: Position, piece: Piece): Position[] {
    switch (piece.type) {
        case "pawn":
            return getPawnMoves(board, position, piece);
        case "knight":
            return getKnightMoves(position);
        case "bishop":
            return getBishopMoves(board, position);
        case "rook":
            return getRookMoves(board, position);
        case "queen":
            return getQueenMoves(board, position);
        case "king":
            return getKingMoves(position);
        default:
            return [];
    }
}

// Check if side is in check
export function isInCheck(board: Board, side: Side): boolean {
    const kingPos = findKing(board, side);
    if (!kingPos) return true; // No king = lost

    // Check if any opponent piece can attack the king
    const opponent: Side = side === "white" ? "black" : "white";

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const piece = board[row][col];
            if (!piece || piece.side !== opponent) continue;

            const moves = getPseudoLegalMoves(board, { row, col }, piece);
            for (const move of moves) {
                if (move.row === kingPos.row && move.col === kingPos.col) {
                    return true;
                }
            }
        }
    }

    return false;
}

// Get all legal moves for a piece at position
export function getLegalMoves(board: Board, position: Position): Position[] {
    const piece = getPiece(board, position);
    if (!piece) return [];

    const pseudoMoves = getPseudoLegalMoves(board, position, piece);
    const legalMoves: Position[] = [];

    for (const target of pseudoMoves) {
        const targetPiece = getPiece(board, target);

        // Cannot capture own piece
        if (targetPiece && targetPiece.side === piece.side) continue;

        // Simulate move and check if it results in check
        const simulatedBoard = cloneBoard(board);
        simulatedBoard[target.row][target.col] = { ...piece, hasMoved: true };
        simulatedBoard[position.row][position.col] = null;

        // Check if this move results in check
        if (isInCheck(simulatedBoard, piece.side)) continue;

        legalMoves.push(target);
    }

    return legalMoves;
}

// Check if side has any legal moves
export function hasLegalMoves(board: Board, side: Side): boolean {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const piece = board[row][col];
            if (!piece || piece.side !== side) continue;
            if (getLegalMoves(board, { row, col }).length > 0) {
                return true;
            }
        }
    }
    return false;
}

// Calculate winner
export function calculateWinner(board: Board, currentSide: Side): Side | null {
    // Check if current player is in checkmate
    if (isInCheck(board, currentSide) && !hasLegalMoves(board, currentSide)) {
        return currentSide === "white" ? "black" : "white";
    }

    // Stalemate (no legal moves but not in check) is a draw - no winner
    if (!isInCheck(board, currentSide) && !hasLegalMoves(board, currentSide)) {
        return null;
    }

    return null;
}
