import { State } from "..";
import { mapDifficultyToGameBoard } from "../../constants";
import { generateBoard } from "../../functions";
import { Faces, GameDifficulty } from "../../types";

export const updateConfiguration = (state: State, action: { type: 'UpdateConfiguration', gameDifficulty: GameDifficulty, rows?: number, columns?: number, numberOfBombs?: number }) => {
  if (state.isPlaying) {
    return {
      ...state
    };
  };

  const { rows, columns, numberOfBombs } = mapDifficultyToGameBoard[action.gameDifficulty];
  const { board } = generateBoard(rows, columns, false)

  return {
    ...state,
    gameDifficulty: action.gameDifficulty,
    rows,
    columns,
    numberOfBombs,
    board,
    flagsPlaced: 0,
    timer: 0,
    face: Faces.Blank,
    isPlaying: false,
    isDead: false,
    isWinner: false
  };
};
