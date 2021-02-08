import { Cell, ChangeType, VisualOption } from "../types";

export const generateBoard = (rows: number, columns: number, returnVisualSteps: boolean): { board: Cell[], visualSteps: VisualOption[] } => {

  const board: Cell[] = new Array(rows * columns).fill(undefined).map((_, index) => ({
    id: index,
    isCovered: true,
    isBomb: false,
    isFlagged: false,
    neighbors: [],
    neighborBombs: 0
  }))

  const visualSteps: VisualOption[] = [];
  if (returnVisualSteps) {
    for (let cellIndex = 0; cellIndex < board.length; cellIndex++) {
      visualSteps.push({
        baseIntervalTimeMs: 5,
        cells: [{
          cellIndex,
          color: '#00aeff',
          uncover: false,
          neighborBombs: 0
        }],
        changeType: ChangeType.GenerateBoard
      })
    }
  }

  return {
    board,
    visualSteps
  }
}