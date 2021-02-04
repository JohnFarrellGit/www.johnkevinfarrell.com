import { Cell } from "../types";
import { revealCells } from "./revealCells";

export const autoPlayer = (board: Cell[]): {
  autoPlayedBoard: Cell[],
  isUpdated: boolean
} => {
  let isUpdated = false;
  for (let i = 0; i < board.length; i++) {
    const cell = board[i];
    let neighborsFlagged = 0;

    for (let i = 0; i < cell.neighbors.length; i++) {
      const neighborIndex = cell.neighbors[i];
      if (board[neighborIndex].isFlagged) neighborsFlagged++;
    }

    if (cell.neighborBombs > 0 && neighborsFlagged === cell.neighborBombs) {
      for (let i = 0; i < cell.neighbors.length; i++) {
        const neighborIndex = cell.neighbors[i];
        revealCells(neighborIndex, board, true, true, true)
      }
    }
  }
  return {
    autoPlayedBoard: board,
    isUpdated
  };
}