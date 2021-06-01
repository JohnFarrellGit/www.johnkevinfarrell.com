import { autoPlayer, autoFlagger, autoPlayerProbabilistic } from ".";
import { CLICK_CELL_COLOR, CLICK_CELL_TIME } from "../constants";
import { Cell, ChangeType, VisualOption } from "../types";
import { autoRevealer } from "./autoRevealer";

export const clickCell = (board: Cell[], cellIndex: number, autoReveal: boolean, autoFlag: boolean, autoPlay: boolean, advancedAutoPlay: boolean, returnVisualSteps: boolean) => {
  const queue: number[] = [cellIndex];
  let visitedCells: Set<number> = new Set([cellIndex, ...board.filter(el => !el.isCovered || el.isFlagged).map(el => el.id)]);
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

    if (autoReveal) {
      autoRevealer(queue, board, visualSteps, cellIndex, visitedCells, recursivelyReveal, autoReveal, returnVisualSteps);
    }

    if (autoFlag) {
      autoFlagger(board, visualSteps, returnVisualSteps);
    }

    if (autoPlay) {
      autoPlayer(queue, visitedCells, board, visualSteps, returnVisualSteps);
    }

    if (advancedAutoPlay) {
      autoPlayerProbabilistic(board, returnVisualSteps);
    }

    visitedCells = new Set([cellIndex, ...visitedCells, ...board.filter(el => !el.isCovered || el.isFlagged).map(el => el.id)]);
  }

  return {
    board,
    visualSteps
  };
}