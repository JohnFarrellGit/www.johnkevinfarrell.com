import { Cell } from "../types";
import { autoFlagger } from "./autoFlagger";
import { autoPlayer } from "./autoPlayer";

export const clickCell = (board: Cell[], cellIndex: number, autoReveal: boolean, autoFlag: boolean, autoPlay: boolean) => {
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

  if (autoFlag) {
    board = autoFlagger(board);
  }

  if (autoPlay) {
    let keepPlaying = true;
    while (keepPlaying) {
      keepPlaying = false;

      const { autoPlayedBoard, isUpdated } = autoPlayer(board);
      keepPlaying = isUpdated;
      board = [...autoPlayedBoard];
      // some if condition that can set keep playing back to true
      // what condition do we decide to uncover a cell?
      // if we already know for sure that it's total number of bombs have already been found, we can uncover the other neighbors

    }
  }

  return board;
}