import { State } from "../..";
import { generateBoard, revealCells } from "../../../functions";
import { calculateNeighborPositions } from "../../../functions/calculateNeighborPositions";
import { Faces, VisualOption } from "../../../types";
import { countNeighborBombs } from "./countNeighborBombs";
import { placeBombs } from "./placeBombs";

export const notPlaying = (state: State, action: { type: 'ClickCell', cellIndex: number }) => {
  const visualSteps: VisualOption[] = [];

  const { board: boardAfterGenerate, visualSteps: generateBoardVisualSteps } = generateBoard(state.rows, state.columns, state.showVisual);
  
  visualSteps.push(...generateBoardVisualSteps);

  const { board: boardAfterPlacingBombs, visualSteps: placeBombsVisualState } = placeBombs(state, boardAfterGenerate, action);
  visualSteps.push(...placeBombsVisualState);

  const { board: boardAfterNeighborPositions, visualSteps: calculateNeighborsVisualState } = calculateNeighborPositions(state, boardAfterPlacingBombs);
  visualSteps.push(...calculateNeighborsVisualState);

  const { board: boardAfterCountingNeighborBombs, visualSteps: countNeighborBombsVisualState } = countNeighborBombs(state, boardAfterNeighborPositions)
  visualSteps.push(...countNeighborBombsVisualState);

  const {
    board: boardWithCellsRevealed,
    visualSteps: boardWithCellsRevealedVisualSteps,
    hasWon,
    hasLost, } = revealCells(action.cellIndex, boardAfterCountingNeighborBombs, state.autoReveal, state.autoFlag, state.autoPlay, state.showVisual);
  visualSteps.push(...boardWithCellsRevealedVisualSteps);

  // this is to allow us to push new steps in O(1) and pop steps in O(1) from visualDisplay.ts
  // visualDisplay.ts already looping over all steps so this converts an O(N^2) operation to O(N)
  visualSteps.reverse();

  if (state.showVisual) {
    return {
      ...state,
      visualSteps
    }
  }

  return {
    ...state,
    board: boardWithCellsRevealed,
    flagsPlaced: 0,
    isPlaying: hasWon || hasLost ? false : true,
    isDead: hasLost,
    isWinner: hasWon,
    face: hasWon ? Faces.Celebration : Faces.Happy,
    timer: 0,
    visualSteps
  }
}