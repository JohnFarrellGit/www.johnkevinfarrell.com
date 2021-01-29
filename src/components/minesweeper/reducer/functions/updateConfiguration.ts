import { State } from "..";
import { mapDifficultyToGameBoard } from "../../constants";
import { generateBoard } from "../../functions";
import { Cell, Faces, GameDifficulty } from "../../types";


const allBoards: Record<number, Record<number, Cell[]>> = {};
for (let rows = 1; rows <= 100; rows++) {
  allBoards[rows] = {};
  for (let columns = 1; columns <= 100; columns++) {
    allBoards[rows][columns] = generateBoard(rows, columns);
  }
};

export const updateConfiguration = (state: State, action: { type: 'UpdateConfiguration', gameDifficulty: GameDifficulty, rows?: number, columns?: number, numberOfBombs?: number }) => {
  if (state.isPlaying) {
    return {
      ...state
    };
  };

  if (action.gameDifficulty === GameDifficulty.Custom && action.rows && action.columns && action.numberOfBombs) {
    return {
      ...state,
      gameDifficulty: action.gameDifficulty,
      rows: action.rows,
      columns: action.columns,
      numberOfBombs: action.numberOfBombs,
      board: allBoards[action.rows][action.columns],
      flagsPlaced: 0,
      timer: 0,
      face: Faces.Blank,
      isPlaying: false,
      isDead: false,
      isWinner: false
    };
  };

  const { rows, columns, numberOfBombs } = mapDifficultyToGameBoard[action.gameDifficulty];

  return {
    ...state,
    gameDifficulty: action.gameDifficulty,
    rows,
    columns,
    numberOfBombs,
    board: allBoards[rows][columns],
    flagsPlaced: 0,
    timer: 0,
    face: Faces.Blank,
    isPlaying: false,
    isDead: false,
    isWinner: false
  };
};
