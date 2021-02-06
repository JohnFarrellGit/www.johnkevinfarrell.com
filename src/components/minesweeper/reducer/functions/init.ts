import { State } from "..";
import { generateBoard } from "../../functions";
import { mapDifficultyToGameBoard } from "../../constants";
import { Faces, FaceType, GameDifficulty } from "../../types";

export const init = (action: {
  type: 'Init',
  gameDifficulty: GameDifficulty,
  faceType: FaceType,
  autoReveal: boolean,
  autoFlag: boolean,
  autoPlay: boolean,
  visualize: boolean,
  customDifficulty?: { rows: number, columns: number, numberOfBombs: number }
}): State => {
  let rows: number;
  let columns: number;
  let numberOfBombs: number;

  if (action.customDifficulty !== undefined) {
    rows = action.customDifficulty.rows;
    columns = action.customDifficulty.columns;
    numberOfBombs = action.customDifficulty.numberOfBombs;
  } else {
    rows = mapDifficultyToGameBoard[action.gameDifficulty].rows;
    columns = mapDifficultyToGameBoard[action.gameDifficulty].columns;
    numberOfBombs = mapDifficultyToGameBoard[action.gameDifficulty].numberOfBombs;
  }

  const board = generateBoard(rows, columns);

  return {
    gameDifficulty: action.gameDifficulty,
    faceType: action.faceType,
    rows,
    columns,
    numberOfBombs,
    board,
    isPlaying: false,
    isDead: false,
    isWinner: false,
    face: Faces.Blank,
    timer: 0,
    display: true,
    autoReveal: action.autoReveal,
    autoFlag: action.autoFlag,
    autoPlay: action.autoPlay,
    visualize: action.visualize
  };
};
