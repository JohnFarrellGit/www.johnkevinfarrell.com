import { Cell } from "../types";

export const revealCells = (cellIndex: number, board: Cell[], autoReveal: boolean): {
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

  const queue: number[] = [cellIndex];
  const visitedCells: Set<number> = new Set([cellIndex, ...board.filter(el => !el.isCovered || el.isFlagged).map(el => el.id)]);

  while (queue.length > 0) {
    const currentCellIndex = queue.pop() as number;

    const newCell = {
      ...board[currentCellIndex],
      isCovered: false
    }

    let numberOfBombs = 0;
    for (let i = 0; i < newCell.neighbors.length; i++) {
      if (board[newCell.neighbors[i]]?.isBomb) numberOfBombs++;
    }
    newCell.neighborBombs = numberOfBombs;

    if (newCell.neighborBombs === 0) {
      for (let i = 0; i < newCell.neighbors.length; i++) {
        if (!visitedCells.has(newCell.neighbors[i]) && autoReveal) {
          visitedCells.add(newCell.neighbors[i]);
          queue.push(newCell.neighbors[i]);
        }
      }
    }

    board[currentCellIndex] = newCell;
  }

  const hasWon = board.filter(cell => !cell.isCovered).length === board.length - board.filter(cell => cell.isBomb).length;
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
