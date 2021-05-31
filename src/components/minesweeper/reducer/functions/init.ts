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
  showVisual: boolean,
  edgelessMode: boolean
}): State => {
  let rows: number;
  let columns: number;
  let numberOfBombs: number;

  rows = mapDifficultyToGameBoard[action.gameDifficulty].rows;
  columns = mapDifficultyToGameBoard[action.gameDifficulty].columns;
  numberOfBombs = mapDifficultyToGameBoard[action.gameDifficulty].numberOfBombs;

  const { board } = generateBoard(rows, columns, false);

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
    showVisual: action.showVisual,
    edgelessMode: action.edgelessMode,
    visualSteps: []
  };
};
