import { Cell } from "../types";

export const autoPlayer = (board: Cell[]): { newCellsToReveal: number[] } => {
  const newCellsToReveal: number[] = [];

  for (let i = 0; i < board.length; i++) {

    const cell = board[i];

    if (cell.isCovered) continue;

    if (!cell.isCovered && cell.neighborBombs === 0) {
      newCellsToReveal.push(...cell.neighbors);
      continue;
    }

    let flaggedNeighbors = 0;
    for (let j = 0; j < cell.neighbors.length; j++) {
      const neighborCell = board[cell.neighbors[j]];
      if (neighborCell.isFlagged) flaggedNeighbors++;
    }

    if (cell.neighborBombs === flaggedNeighbors) {
      for (let j = 0; j < cell.neighbors.length; j++) {
        const neighborCell = board[cell.neighbors[j]];
        if (!neighborCell.isFlagged) {
          newCellsToReveal.push(cell.neighbors[j])
        }
      }
    }
  }

  return {
    newCellsToReveal
  };
}