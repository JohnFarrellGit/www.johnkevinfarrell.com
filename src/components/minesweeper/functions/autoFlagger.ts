import { MARK_FOR_FLAG_COLOR, VISIT_CELL_COLOR } from "../constants";
import { Cell, ChangeType, VisualOption } from "../types";

export const autoFlagger = (board: Cell[], visualSteps: VisualOption[], returnVisualSteps: boolean) => {

  const flaggedIndexes: number[] = [];

  for (let cellIndex = 0; cellIndex < board.length; cellIndex++) {
    const cell = board[cellIndex];

    if (!cell.isCovered) {
      if (cell.neighborBombs > 0) {

        if (returnVisualSteps) {
          visualSteps.push({
            baseIntervalTimeMs: 50,
            cells: [
              {
                cellIndex,
                color: VISIT_CELL_COLOR,
                uncover: true,
                flag: board[cellIndex].isFlagged,
                neighborBombs: board[cellIndex].neighborBombs
              },
              ...flaggedIndexes.map(flaggedIndex => ({
                cellIndex: flaggedIndex,
                color: MARK_FOR_FLAG_COLOR,
                uncover: false,
                flag: true,
                neighborBombs: 0
              }))
            ],
            changeType: ChangeType.LookForCellsToFlag
          });
        };

        let neighborsCovered = 0;
        for (let i = 0; i < cell.neighbors.length; i++) {
          const neighborIndex = cell.neighbors[i];
          if (board[neighborIndex].isCovered) neighborsCovered++;
        }
        if (neighborsCovered === cell.neighborBombs) {
          for (let i = 0; i < cell.neighbors.length; i++) {
            const neighborIndex = cell.neighbors[i];
            if (board[neighborIndex].isCovered) {
              board[neighborIndex].isFlagged = true;
              flaggedIndexes.push(neighborIndex);
            }
          }
        }
      }
    }
  }

  return {
    visualSteps
  };
}