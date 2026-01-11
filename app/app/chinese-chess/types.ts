export const ROWS = 10;
export const COLS = 9;

export type Side = "red" | "black";

export type PieceType =
    | "general"
    | "advisor"
    | "elephant"
    | "horse"
    | "chariot"
    | "cannon"
    | "soldier";

export interface Piece {
    id: string;
    side: Side;
    type: PieceType;
}

export type Square = Piece | null;

export type Board = Square[][];

export interface Position {
    row: number;
    col: number;
}

export interface Scores {
    red: number;
    black: number;
}
