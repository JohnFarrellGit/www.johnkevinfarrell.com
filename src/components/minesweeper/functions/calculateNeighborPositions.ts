import { generateNeighbors } from ".";
import { State } from "../reducer";
import { Cell, ChangeType, VisualOption } from "../types";

export const calculateNeighborPositions = (state: State, board: Cell[]) => {

  const visualSteps: VisualOption[] = [];

  for (let cellIndex = 0; cellIndex < board.length; cellIndex++) {

    board[cellIndex].neighbors = generateNeighbors(cellIndex, state.columns, state.rows);

    if (state.showVisual) {
      const cells = [{
        cellIndex,
        color: '#00aeff',
      }]

      for (let i = 0; i < board[cellIndex].neighbors.length; i++) {
        cells.push({
          cellIndex: board[cellIndex].neighbors[i],
          color: '#957DAD'
        })
      }

      visualSteps.push({
        baseIntervalTimeMs: 5,
        cells,
        changeType: ChangeType.GenerateNeighbors
      })
    }
  }

  return {
    board,
    visualSteps
  }
}