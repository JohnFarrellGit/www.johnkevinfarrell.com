import { clearLine } from "readline";
import { Cell } from "../types";

export const autoFlag = (board: Cell[]) => {
  const newBoard = [...board];

  for (let i = 0; i < board.length; i++) {
    const cell = { ...board[i] };
    let neighborsCovered = 0;

    if (!cell.isCovered) {
      if (cell.neighborBombs > 0) {
        for (let i = 0; i < cell.neighbors.length; i++) {
          const neighborIndex = cell.neighbors[i];
          if (board[neighborIndex].isCovered) neighborsCovered++;
        }
        if (neighborsCovered === cell.neighborBombs) {
          for (let i = 0; i < cell.neighbors.length; i++) {
            const neighborIndex = cell.neighbors[i];
            if (board[neighborIndex].isCovered) newBoard[neighborIndex].isFlagged = true;
          }
        }
      }
    }
  }
  return board;
}