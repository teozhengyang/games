export const ROWS = 8;
export const COLS = 8;

export type Side = "black" | "white";

export interface Piece {
    side: Side;
}

export type Square = Piece | null;

export type Board = Square[][];

export interface Position {
    row: number;
    col: number;
}

export interface Scores {
    black: number;
    white: number;
}
