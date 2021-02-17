import { autoPlayer, autoFlagger, autoPlayerProbabilistic } from ".";
import { CLICK_CELL_COLOR, CLICK_CELL_TIME, RECURSIVELY_REVEAL_CELL_COLOR, RECURSIVE_REVEAL_TIME } from "../constants";
import { Cell, ChangeType, VisualOption } from "../types";

export const clickCell = (board: Cell[], cellIndex: number, autoReveal: boolean, autoFlag: boolean, autoPlay: boolean, returnVisualSteps: boolean) => {
  const queue: number[] = [cellIndex];
  const visitedCells: Set<number> = new Set([cellIndex, ...board.filter(el => !el.isCovered || el.isFlagged).map(el => el.id)]);
  const recursivelyReveal: number[] = []

  const visualSteps: VisualOption[] = []

  if (returnVisualSteps) {
    visualSteps.push({
      baseIntervalTimeMs: CLICK_CELL_TIME,
      cells: [{
        cellIndex: cellIndex,
        color: CLICK_CELL_COLOR,
        uncover: true,
        flag: board[cellIndex].isFlagged,
        neighborBombs: board[cellIndex].neighborBombs
      }],
      changeType: ChangeType.RevealClickedCell
    });
  }

  while (queue.length > 0) {

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

            if (returnVisualSteps) {
              visitedCells.add(newCell.neighbors[i]);
              queue.push(newCell.neighbors[i]);
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
    }

    if (autoFlag) {
      const { board: flaggedBoard, visualSteps: flaggedVisualSteps } = autoFlagger(board, returnVisualSteps);
      board = flaggedBoard
      visualSteps.push(...flaggedVisualSteps)
    }

    if (autoPlay) {
      const { newCellsToReveal, visualSteps: autoPlayVisualSteps } = autoPlayer(board)
      newCellsToReveal.forEach(cell => {
        if (!visitedCells.has(cell)) {
          queue.push(cell);
          visitedCells.add(cell)
        }
      });
    }

    // if (!returnVisualSteps) {
    //   board[currentCellIndex] = newCell;
    // }


  }

  // autoPlayerProbabilistic(board);

  return {
    board,
    visualSteps
  };
}