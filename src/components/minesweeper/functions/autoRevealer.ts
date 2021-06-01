import { CLICK_CELL_COLOR, RECURSIVELY_REVEAL_CELL_COLOR, RECURSIVE_REVEAL_TIME } from "../constants";
import { Cell, ChangeType, VisualOption } from "../types";

export const autoRevealer = (
  queue: number[],
  board: Cell[],
  visualSteps: VisualOption[],
  cellIndex: number,
  visitedCells: Set<number>,
  recursivelyReveal: number[],
  autoReveal: boolean,
  returnVisualSteps: boolean) => {

  while (queue.length > 0) {
    const currentCellIndex = queue.pop() as number;

    const newCell = {
      ...board[currentCellIndex],
      isCovered: false
    }
    board[currentCellIndex] = newCell;

    if (newCell.neighborBombs === 0) {
      for (let i = 0; i < newCell.neighbors.length; i++) {

        if (!visitedCells.has(newCell.neighbors[i]) && autoReveal) {

          visitedCells.add(newCell.neighbors[i]);
          queue.push(newCell.neighbors[i]);

          if (returnVisualSteps) {
            recursivelyReveal.push(newCell.neighbors[i]);

            visualSteps.push({
              baseIntervalTimeMs: RECURSIVE_REVEAL_TIME,
              cells: [{
                cellIndex,
                color: CLICK_CELL_COLOR,
                uncover: true,
                flag: board[currentCellIndex].isFlagged,
                neighborBombs: board[currentCellIndex].neighborBombs
              }, ...recursivelyReveal.map((cellIndex) => ({
                cellIndex,
                color: RECURSIVELY_REVEAL_CELL_COLOR,
                uncover: true,
                flag: board[currentCellIndex].isFlagged,
                neighborBombs: board[cellIndex].neighborBombs
              }))],
              changeType: ChangeType.RevealClickedCellAndNeighbors
            });
          }
        }
      }
    }
  };
}