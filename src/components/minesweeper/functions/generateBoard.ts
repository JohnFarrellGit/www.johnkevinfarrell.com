import { generateNeighbors } from ".";
import { Cell, ChangeType, VisualOption } from "../types";

export const generateBoard = (rows: number, columns: number, returnVisualSteps: boolean): { board: Cell[], visualSteps: VisualOption[] } => {

  const board = new Array(rows * columns).fill(null).map((_, index) => ({
    isBomb: false,
    isCovered: true,
    isFlagged: false,
    id: index,
    neighbors: generateNeighbors(index, columns, rows),
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
        }],
        changeType: ChangeType.GenerateBoard
      })
    }

    for (let cellIndex = 0; cellIndex < board.length; cellIndex++) {

      const neighbors = generateNeighbors(cellIndex, columns, rows)

      if (returnVisualSteps) {
        const cells = [{
          cellIndex,
          color: '#00aeff',
        }]

        for (let i = 0; i < neighbors.length; i++) {
          cells.push({
            cellIndex: neighbors[i],
            color: '#957DAD'
          })
        }

        visualSteps.push({
          baseIntervalTimeMs: 10,
          cells,
          changeType: ChangeType.GenerateNeighbors
        })
      }
    }
  }

  return {
    board,
    visualSteps
  }
}