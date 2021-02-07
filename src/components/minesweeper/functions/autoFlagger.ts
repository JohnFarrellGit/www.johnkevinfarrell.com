import { Cell, ChangeType, VisualOption } from "../types";

export const autoFlagger = (board: Cell[], returnVisualSteps: boolean) => {

  const visualSteps: VisualOption[] = [];

  const flaggedIndexes: number[] = [];

  for (let i = 0; i < board.length; i++) {
    const cell = board[i];

    if (!cell.isCovered) {
      if (cell.neighborBombs > 0) {
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

    if (returnVisualSteps) {
      visualSteps.push({
        cells: [{
          cellIndex: i,
          color: '#00aeff'
        },
        ...flaggedIndexes.map((cellIndex) => ({
          cellIndex,
          color: '#FF6666'
        }))
        ],
        baseIntervalTimeMs: 50,
        changeType: ChangeType.LookForCellsToFlag
      })
    }
  }

  return {
    board,
    visualSteps
  };
}