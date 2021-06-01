import { mapDifficultyToGameBoard } from "../constants";
import { FaceType, GameDifficulty } from "../types";

export const getGameDifficulty = (gameDifficulty: GameDifficulty): GameDifficulty => {
  if ((typeof gameDifficulty === "number") && (gameDifficulty >= 0) && (gameDifficulty <= 3)) {
    return gameDifficulty;
  }
  return GameDifficulty.Beginner;
}

export const getFaceType = (faceType: FaceType): FaceType => {
  if ((typeof faceType === "number") && (faceType >= 0) && (faceType <= 1)) {
    return faceType;
  }
  return FaceType.Regular
}

export const getCustomBoardConfig = (gameDifficulty: GameDifficulty) => {
  return {
    columns: getNumberOfColumns(gameDifficulty),
    rows: getNumberOfRows(gameDifficulty),
    numberOfBombs: getNumberOfBombs(gameDifficulty),
  }
}

const getNumberOfRows = (gameDifficulty: GameDifficulty) => {
  const difficulty = getGameDifficulty(gameDifficulty)
  return mapDifficultyToGameBoard[difficulty].rows;
}

const getNumberOfColumns = (gameDifficulty: GameDifficulty) => {
  const difficulty = getGameDifficulty(gameDifficulty)
  return mapDifficultyToGameBoard[difficulty].columns;
}

const getNumberOfBombs = (gameDifficulty: GameDifficulty) => {
  const difficulty = getGameDifficulty(gameDifficulty)
  return mapDifficultyToGameBoard[difficulty].numberOfBombs;
}

export const getAutoReveal = (autoReveal: boolean): boolean => {
  if (typeof autoReveal !== 'boolean') {
    return true;
  }
  return autoReveal;
}

export const getAutoFlag = (autoFlag: boolean): boolean => {
  if (typeof autoFlag !== 'boolean') {
    return false;
  }
  return autoFlag;
}

export const getAutoPlay = (autoPlay: boolean): boolean => {
  if (typeof autoPlay !== 'boolean') {
    return false;
  }
  return autoPlay;
}

export const getAdvancedAutoPlay = (autoPlay: boolean): boolean => {
  if (typeof autoPlay !== 'boolean') {
    return false;
  }
  return autoPlay;
}

export const getShowVisual = (visualize: boolean): boolean => {
  if (typeof visualize !== 'boolean') {
    return false;
  }
  return visualize;
}

export const getEdgelessMode = (edgelessMode: boolean): boolean => {
  if (typeof edgelessMode !== 'boolean') {
    return false;
  }
  return edgelessMode;
}