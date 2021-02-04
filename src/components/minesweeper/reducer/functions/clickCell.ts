import { State } from "..";
import { generateBoard, revealCells } from "../../functions";
import { Faces } from "../../types";

export const clickCell = (state: State, action: { type: 'ClickCell', cellIndex: number }) => {
  const newBoard = [...state.board!];

  if (state.isPlaying && state.board && (!state.board[action.cellIndex].isCovered || state.board[action.cellIndex].isFlagged)) {
    return {
      ...state,
      face: Faces.Happy
    }
  }

  // handle resetting the game after winning or losing
  if (state.isDead || state.isWinner) {
    return {
      ...state,
      board: generateBoard(state.rows, state.columns),
      flagsPlaced: 0,
      isPlaying: false,
      isDead: false,
      isWinner: false,
      face: Faces.Blank,
      timer: 0
    }
  }
  // handle if not started yet, create board then reveal changes
  if (!state.isPlaying) {

    let bombsLeft = state.numberOfBombs || 0;
    const possibleBombLocations = state.board ? state.board.map(el => el.id).filter(id => id !== action.cellIndex) : [];

    // fisher-yates random shuffling algorithm
    for (let i = possibleBombLocations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = possibleBombLocations[i]
      possibleBombLocations[i] = possibleBombLocations[j]
      possibleBombLocations[j] = temp
    }

    while (bombsLeft > 0) {
      const randomBombLocation = possibleBombLocations.pop() as number;
      newBoard[randomBombLocation] = {
        ...newBoard[randomBombLocation],
        isBomb: true
      }
      bombsLeft--;
    }

    const boardWithCellsRevealed = revealCells(action.cellIndex, newBoard, state.autoReveal, state.autoFlag, state.autoPlay);

    return {
      ...state,
      board: boardWithCellsRevealed.board,
      flagsPlaced: 0,
      isPlaying: boardWithCellsRevealed.hasWon ? false : true,
      isDead: boardWithCellsRevealed.hasLost,
      isWinner: boardWithCellsRevealed.hasWon,
      face: Faces.Happy,
      timer: 0
    }
  }

  const boardWithCellsRevealed = revealCells(action.cellIndex, newBoard, state.autoReveal, state.autoFlag, state.autoPlay);

  return {
    ...state,
    board: boardWithCellsRevealed.board,
    isPlaying: !boardWithCellsRevealed.hasLost && !boardWithCellsRevealed.hasWon,
    isDead: boardWithCellsRevealed.hasLost,
    isWinner: boardWithCellsRevealed.hasWon,
    face: boardWithCellsRevealed.hasLost ? Faces.Dizzy : boardWithCellsRevealed.hasWon ? Faces.Celebration : Faces.Happy,
  }
}