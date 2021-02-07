import { autoPlayer, autoFlagger, autoPlayerProbabilistic } from ".";
import { Cell, ChangeType, VisualOption } from "../types";

export const clickCell = (board: Cell[], cellIndex: number, autoReveal: boolean, autoFlag: boolean, autoPlay: boolean, returnVisualSteps: boolean) => {
  const queue: number[] = [cellIndex];
  const visitedCells: Set<number> = new Set([cellIndex, ...board.filter(el => !el.isCovered || el.isFlagged).map(el => el.id)]);
  const recursivelyReveal: number[] = []

  const visualSteps: VisualOption[] = []
  if (returnVisualSteps) {
    visualSteps.push({
      baseIntervalTimeMs: 250,
      cells: [{
        cellIndex: cellIndex,
        color: '#1f7344'
      }],
      changeType: ChangeType.RevealClickedCell
    });
  }

  while (queue.length > 0) {
    const currentCellIndex = queue.pop() as number;

    const newCell = {
      ...board[currentCellIndex],
      isCovered: false
    }

    if (newCell.neighborBombs === 0) {
      for (let i = 0; i < newCell.neighbors.length; i++) {
        // only recursively reveal empty neighbor cells if autoReveal is toggled on by user
        if (!visitedCells.has(newCell.neighbors[i]) && autoReveal) {
          visitedCells.add(newCell.neighbors[i]);
          queue.push(newCell.neighbors[i]);

          if (returnVisualSteps) {
            recursivelyReveal.push(newCell.neighbors[i])
            visualSteps.push({
              baseIntervalTimeMs: 100,
              cells: [{
                cellIndex: cellIndex,
                color: '#1f7344'
              }, ...recursivelyReveal.map((cellIndex) => ({
                cellIndex,
                color: '#54d18c'
              }))],
              changeType: ChangeType.RevealClickedCellAndNeighbors
            })
          }
        }
      }
    }

    board[currentCellIndex] = newCell;

    if (autoFlag) {
      board = [...autoFlagger(board)]
    }

    if (autoPlay) {
      const { newCellsToReveal } = autoPlayer(board)
      newCellsToReveal.forEach(cell => {
        if (!visitedCells.has(cell)) {
          queue.push(cell);
          visitedCells.add(cell)
        }
      });
    }
  }

  autoPlayerProbabilistic(board);

  return {
    board,
    visualSteps
  };
}