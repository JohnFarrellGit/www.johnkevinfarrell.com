import { State } from "../..";
import { generateBoard, revealCells } from "../../../functions";
import { Faces, VisualOption } from "../../../types";
import { countNeighborBombs } from "./countNeighborBombs";
import { placeBombs } from "./placeBombs";

export const notPlaying = (state: State, action: { type: 'ClickCell', cellIndex: number }) => {
  const visualSteps: VisualOption[] = []

  const { board: boardAfterGenerate, visualSteps: generateBoardVisualSteps } = generateBoard(state.rows, state.columns, state.showVisual);
  visualSteps.push(...generateBoardVisualSteps);

  const { board: boardAfterPlacingBombs, visualSteps: placeBombsVisualState } = placeBombs(state, boardAfterGenerate, action);
  visualSteps.push(...placeBombsVisualState);

  const { board: boardAfterCountingNeighborBombs, visualSteps: countNeighborBombsVisualState } = countNeighborBombs(state, boardAfterPlacingBombs)
  visualSteps.push(...countNeighborBombsVisualState);

  // carry on from HERE, clickCells() is probably reason for everything being revealed as visualization starts
  const boardWithCellsRevealed = revealCells(action.cellIndex, boardAfterCountingNeighborBombs, state.autoReveal, state.autoFlag, state.autoPlay, state.showVisual);

  if (state.showVisual) {
    visualSteps.push(...boardWithCellsRevealed.visualSteps);
  }

  if (visualSteps) {
    return {
      ...state,
      visualSteps
    }
  }

  // return {
  //   ...state,
  //   board: boardWithCellsRevealed.board,
  //   flagsPlaced: 0,
  //   isPlaying: boardWithCellsRevealed.hasWon ? false : true,
  //   isDead: boardWithCellsRevealed.hasLost,
  //   isWinner: boardWithCellsRevealed.hasWon,
  //   face: boardWithCellsRevealed.hasWon ? Faces.Celebration : Faces.Happy,
  //   timer: 0,
  //   visualSteps
  // }
}