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

    while (queue.length > 0) {
      const currentCellIndex = queue.pop() as number;

      const newCell = {
        ...board[currentCellIndex],
        isCovered: false
      }
      board[currentCellIndex] = newCell;

      if (newCell.neighborBombs === 0) {
        for (let i = 0; i < newCell.neighbors.length; i++) {
          // only recursively reveal empty neighbor cells if autoReveal is toggled on by user
          if (!visitedCells.has(newCell.neighbors[i]) && autoReveal) {

            if (returnVisualSteps) {
              visitedCells.add(newCell.neighbors[i]);
              queue.push(newCell.neighbors[i]);

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

    }

    // if (returnVisualSteps) {
    //   visualSteps.push({
    //     baseIntervalTimeMs: 100,
    //     cells: [{
    //       cellIndex: cellIndex,
    //       color: '#1f7344'
    //     }, ...recursivelyReveal.map((cellIndex) => ({
    //       cellIndex,
    //       color: '#54d18c'
    //     }))],
    //     changeType: ChangeType.RevealClickedCellAndNeighbors,
    //     board
    //   })
    // }

    // if (!returnVisualSteps) {
    //   board[currentCellIndex] = newCell;
    // }

    // if (autoFlag) {
    //   const { board: flaggedBoard, visualSteps: flaggedVisualSteps } = autoFlagger(board, returnVisualSteps);
    //   console.log("🚀 ~ file: clickCell.ts ~ line 58 ~ clickCell ~ flaggedVisualSteps", flaggedVisualSteps)
    //   board = [...flaggedBoard]
    //   visualSteps.push(...flaggedVisualSteps)
    // }

    // if (autoPlay) {
    //   const { newCellsToReveal } = autoPlayer(board)
    //   newCellsToReveal.forEach(cell => {
    //     if (!visitedCells.has(cell)) {
    //       queue.push(cell);
    //       visitedCells.add(cell)
    //     }
    //   });
    // }
  }

  // autoPlayerProbabilistic(board);

  console.log("🚀 ~ file: clickCell.ts ~ line 10 ~ clickCell ~ visualSteps", visualSteps)

  return {
    board,
    visualSteps
  };
}