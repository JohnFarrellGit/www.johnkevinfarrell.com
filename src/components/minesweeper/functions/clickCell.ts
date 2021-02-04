import { autoPlayer, autoFlagger } from ".";
import { Cell } from "../types";

export const clickCell = (board: Cell[], cellIndex: number, autoReveal: boolean, autoFlag: boolean, autoPlay: boolean) => {
  const queue: number[] = [cellIndex];
  const visitedCells: Set<number> = new Set([cellIndex, ...board.filter(el => !el.isCovered || el.isFlagged).map(el => el.id)]);

  while (queue.length > 0) {
    const currentCellIndex = queue.pop() as number;

    const newCell = {
      ...board[currentCellIndex],
      isCovered: false
    }

    if (newCell.neighborBombs === 0) {
      for (let i = 0; i < newCell.neighbors.length; i++) {
        if (!visitedCells.has(newCell.neighbors[i]) && autoReveal) {
          visitedCells.add(newCell.neighbors[i]);
          queue.push(newCell.neighbors[i]);
        }
      }
    }

    board[currentCellIndex] = newCell;

    if (autoFlag) {
      board = [...autoFlagger(board)]
    }

    if (autoPlay) {
      const { newCellsToReveal } = autoPlayer(board)
      newCellsToReveal.forEach(cell => {
        if (!visitedCells.has(cell)) {
          queue.push(cell);
          visitedCells.add(cell)
        }
      });
    }
  }

  return board;
}