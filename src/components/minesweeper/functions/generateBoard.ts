import { generateNeighbors } from ".";
import { Cell } from "../types";

export const generateBoard = (rows: number, columns: number): Cell[] => {
  return new Array(rows * columns).fill(null).map((_, index) => ({
    isBomb: false,
    isCovered: true,
    isFlagged: false,
    id: index,
    neighbors: generateNeighbors(index, columns, rows),
    neighborBombs: 0
  }))
}