import { State } from "../..";
import { Cell, ChangeType, VisualCellInformation, VisualOption } from "../../../types";

export const countNeighborBombs = (state: State, board: Cell[]) => {
  const visualSteps: VisualOption[] = []

  for (let i = 0; i < board.length; i++) {
    const newCell = { ...board[i] };
    let numberOfBombs = 0;

    const cells: VisualCellInformation[] = [];

    if (state.showVisual) {
      cells.push({
        cellIndex: i,
        color: '#00aeff'
      })
    }

    for (let j = 0; j < newCell.neighbors.length; j++) {
      const neighborIndex = newCell.neighbors[j];
      const neighborIsBomb = board[neighborIndex].isBomb
      if (neighborIsBomb) numberOfBombs++;

      if (state.showVisual) {
        cells.push({
          cellIndex: neighborIndex,
          color: neighborIsBomb ? '#FF6666' : '#3CB371'
        })
      }
    }

    if (state.showVisual) {
      visualSteps.push({
        baseIntervalTimeMs: 50,
        cells,
        changeType: ChangeType.CalculateNeighborBombs
      })
    }

    newCell.neighborBombs = numberOfBombs;
    board[i] = newCell;
  }

  return {
    board,
    visualSteps
  }
}