import { Cell } from "../types";

export const autoPlayerProbabilistic = (board: Cell[], returnVisualSteps: boolean): { newCellsToReveal: number[] } => {

  for (let i = 0; i < board.length; i++) {

    const cell = board[i];

    if (cell.isCovered) continue;

    if (!cell.isCovered && cell.neighborBombs === 0) {
      continue;
    }



    const permutationCells = new Set<number>();
    // start adding ourselves and valid neighbors to the set

    const potentialCells = [i];

    while (potentialCells.length > 0) {
      const cellIndex = potentialCells.pop() as number;
      const cell = board[cellIndex];
      if (cell.isCovered || cell.isFlagged) continue;

      let coveredNeighbors = 0;
      for (let j = 0; j < cell.neighbors.length; j++) {
        const neighborCell = board[cell.neighbors[j]];
        if (neighborCell.isCovered) coveredNeighbors++;
      }
      if (coveredNeighbors === 0) {
        continue;
      }
      if (!permutationCells.has(cellIndex)) {
        permutationCells.add(cellIndex);
        potentialCells.push(...board[cellIndex].neighbors)
      }
    }

    // console.log("🚀 ~ file: autoPlayerProbabilistic.ts ~ line 49 ~ permutationCells", permutationCells)
  }

  // we then create every permutation of bomb spots possible, we count the number of valid permutations, we count how often bombs appeared in each cell
  // is it possible to do without brute force?
  // with too many permutationCells we will take universe time to compute, can we figure out connected cells and make smaller reasonable slices
  // can we alternatively look for common patterns and resolve those such as 121 pattern
  // any with 0 can never be a bomb, any with 100% must always be a bomb, can flag and clear accordingly
  // we then can create the probability of each cell having a bomb, any 0% cell can be uncovered and any 100% cell flagged

  // we could also consider how many bombs are left in total

  return {
    newCellsToReveal: []
  };
}