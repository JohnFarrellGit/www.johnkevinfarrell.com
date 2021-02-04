import { Cell } from "../types";
import { clickCell } from "./clickCell";

export const revealCells = (cellIndex: number, board: Cell[], autoReveal: boolean, autoFlag: boolean, autoPlay: boolean): {
  board: Cell[],
  hasWon: boolean,
  hasLost: boolean
} => {

  if (board[cellIndex].isBomb) {
    const newCell = {
      ...board[cellIndex],
      isCovered: false
    }
    board[cellIndex] = newCell;

    return {
      board,
      hasWon: false,
      hasLost: true
    }
  }

  board = clickCell(board, cellIndex, autoReveal, autoFlag, autoPlay);

  const hasWon = board.filter(cell => !cell.isCovered).length === board.filter(cell => !cell.isBomb).length;
  if (hasWon) {
    for (let i = 0; i < board.length; i++) {
      board[i] = {
        ...board[i],
        isCovered: false
      };
    }
  }

  return {
    board,
    hasWon,
    hasLost: false
  };
}
