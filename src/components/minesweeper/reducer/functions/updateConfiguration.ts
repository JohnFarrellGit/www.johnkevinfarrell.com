import { State } from "..";
import { mapDifficultyToGameBoard } from "../../constants";
import { generateBoard } from "../../functions";
import { Faces, GameDifficulty } from "../../types";

export const updateConfiguration = (state: State, action: { type: 'UpdateConfiguration', gameDifficulty: GameDifficulty, rows?: number, columns?: number, numberOfBombs?: number }) => {
  if (state.isPlaying) {
    return {
      ...state
    }
  }

  if (action.gameDifficulty === GameDifficulty.Custom && action.rows && action.columns && action.numberOfBombs) {
    return {
      ...state,
      gameDifficulty: action.gameDifficulty,
      rows: action.rows,
      columns: action.columns,
      numberOfBombs: action.numberOfBombs,
      board: generateBoard(action.rows, action.columns),
      flagsPlaced: 0,
      timer: 0,
      face: Faces.Blank,
      isPlaying: false,
      isDead: false,
      isWinner: false
    }
  }

  const { rows, columns, numberOfBombs } = mapDifficultyToGameBoard[action.gameDifficulty];

  return {
    ...state,
    gameDifficulty: action.gameDifficulty,
    rows,
    columns,
    numberOfBombs,
    board: generateBoard(rows, columns),
    flagsPlaced: 0,
    timer: 0,
    face: Faces.Blank,
    isPlaying: false,
    isDead: false,
    isWinner: false
  }
}