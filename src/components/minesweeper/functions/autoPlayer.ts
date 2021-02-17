import { MARK_FOR_CLEARING_COLOR, VISIT_CELL_COLOR } from "../constants";
import { Cell, ChangeType, VisualOption } from "../types";

export const autoPlayer = (board: Cell[]) => {
  const newCellsToReveal: number[] = [];
  const visualSteps: VisualOption[] = [];

  for (let cellIndex = 0; cellIndex < board.length; cellIndex++) {

    const cell = board[cellIndex];

    if (cell.isCovered) continue;

    if (!cell.isCovered && cell.neighborBombs === 0) {
      newCellsToReveal.push(...cell.neighbors);
      continue;
    }

    visualSteps.push({
      baseIntervalTimeMs: 50,
      changeType: ChangeType.LookForCellsToReveal,
      cells: [{
        cellIndex,
        color: VISIT_CELL_COLOR,
        uncover: false,
        flag: false,
        neighborBombs: cell.neighborBombs
      }],
    })

    let flaggedNeighbors = 0;
    for (let j = 0; j < cell.neighbors.length; j++) {
      const neighborCell = board[cell.neighbors[j]];
      if (neighborCell.isFlagged) flaggedNeighbors++;
    }

    if (cell.neighborBombs === flaggedNeighbors) {
      for (let j = 0; j < cell.neighbors.length; j++) {
        const neighborCell = board[cell.neighbors[j]];
        if (!neighborCell.isFlagged) {
          newCellsToReveal.push(cell.neighbors[j]);

          visualSteps.push({
            baseIntervalTimeMs: 50,
            changeType: ChangeType.LookForCellsToReveal,
            cells: [{
              cellIndex,
              color: VISIT_CELL_COLOR,
              uncover: false,
              flag: false,
              neighborBombs: cell.neighborBombs
            },
            ...newCellsToReveal.map((cellRevealIndex) => ({
              cellIndex: cellRevealIndex,
              color: MARK_FOR_CLEARING_COLOR,
              uncover: true,
              flag: false,
              neighborBombs: board[cellIndex].neighborBombs
            }))
            ],
          })
        }
      }
    }
  }

  return {
    newCellsToReveal,
    visualSteps
  };
}