import { State } from "../..";
import { revealCells } from "../../../functions";
import { Faces } from "../../../types";
import { checkValidClick } from "./checkValidClick";
import { notPlaying } from "./notPlaying";
import { resetGame } from "./resetGame";

export const clickCell = (state: State, action: { type: 'ClickCell', cellIndex: number }) => {
  const newBoard = [...state.board];

  const { validClick, newState } = checkValidClick(state, action);
  if (!validClick) {
    if (newState !== undefined) {
      return newState;
    }
    return {
      ...state
    };
  }

  if (state.isDead || state.isWinner) {
    return resetGame(state);
  }

  if (!state.isPlaying) {
    return notPlaying(state, action)
  }

  if (state.isPlaying && (!state.isDead || state.isWinner)) {
    const boardWithCellsRevealed = revealCells(action.cellIndex, newBoard, state.autoReveal, state.autoFlag, state.autoPlay, state.showVisual);

    return {
      ...state,
      board: boardWithCellsRevealed.board,
      isPlaying: !boardWithCellsRevealed.hasLost && !boardWithCellsRevealed.hasWon,
      isDead: boardWithCellsRevealed.hasLost,
      isWinner: boardWithCellsRevealed.hasWon,
      face: boardWithCellsRevealed.hasLost ? Faces.Dizzy : boardWithCellsRevealed.hasWon ? Faces.Celebration : Faces.Happy,
    }
  }
}
