import { State } from "../..";
import { generateBoard, revealCells } from "../../../functions";
import { calculateNeighborPositions } from "../../../functions/calculateNeighborPositions";
import { Faces, VisualOption } from "../../../types";
import { countNeighborBombs } from "./countNeighborBombs";
import { placeBombs } from "./placeBombs";

export const notPlaying = (state: State, action: { type: 'ClickCell', cellIndex: number }) => {

  const { board: boardAfterGenerate, visualSteps: generateBoardVisualSteps } = generateBoard(state.rows, state.columns, state.showVisual);
  const { board: boardAfterPlacingBombs, visualSteps: placeBombsVisualState } = placeBombs(state, boardAfterGenerate, action);
  const { board: boardAfterNeighborPositions, visualSteps: calculateNeighborsVisualState } = calculateNeighborPositions(state, boardAfterPlacingBombs);
  const { board: boardAfterCountingNeighborBombs, visualSteps: countNeighborBombsVisualState } = countNeighborBombs(state, boardAfterNeighborPositions)

  const {
    board: boardWithCellsRevealed,
    visualSteps: boardWithCellsRevealedVisualSteps,
    hasWon,
    hasLost, } = revealCells(action.cellIndex, boardAfterCountingNeighborBombs, state.autoReveal, state.autoFlag, state.autoPlay, state.showVisual);

  if (!state.showVisual) {
    return {
      ...state,
      board: boardWithCellsRevealed,
      flagsPlaced: 0,
      isPlaying: hasWon || hasLost ? false : true,
      isDead: hasLost,
      isWinner: hasWon,
      face: hasWon ? Faces.Celebration : Faces.Happy,
      timer: 0,
      visualSteps: []
    }
  }

  const visualSteps: VisualOption[] = [];

  visualSteps.push(...generateBoardVisualSteps);

  visualSteps.push(...placeBombsVisualState);

  visualSteps.push(...calculateNeighborsVisualState);

  visualSteps.push(...countNeighborBombsVisualState);

  visualSteps.push(...boardWithCellsRevealedVisualSteps);

  // this is to allow us to push new steps in O(1) and pop steps in O(1) from visualDisplay.ts
  // visualDisplay.ts already looping over all steps so this converts an O(N^2) operation to O(N)
  visualSteps.reverse();

  return {
    ...state,
    visualSteps
  }
}