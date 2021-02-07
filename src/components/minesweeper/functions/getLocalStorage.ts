import { MinesweeperCustomSettings } from "../../../common/hooks/useLocalStorage";
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

export const getCustomBoardConfig = (gameDifficulty: GameDifficulty, customSettings: MinesweeperCustomSettings) => {
  return {
    columns: getNumberOfColumns(gameDifficulty, customSettings),
    rows: getNumberOfRows(gameDifficulty, customSettings),
    numberOfBombs: getNumberOfBombs(gameDifficulty, customSettings),
  }
}

const getNumberOfRows = (gameDifficulty: GameDifficulty, customSettings: MinesweeperCustomSettings) => {
  const difficulty = getGameDifficulty(gameDifficulty)
  if (difficulty === GameDifficulty.Custom) {
    if (customSettings) {
      return customSettings.rows
    } else {
      return 10;
    }
  } else {
    return mapDifficultyToGameBoard[difficulty].rows;
  }
}

const getNumberOfColumns = (gameDifficulty: GameDifficulty, customSettings: MinesweeperCustomSettings) => {
  const difficulty = getGameDifficulty(gameDifficulty)
  if (difficulty === GameDifficulty.Custom) {
    if (customSettings) {
      return customSettings.columns;
    } else {
      return 10;
    }
  } else {
    return mapDifficultyToGameBoard[difficulty].columns;
  }
}

const getNumberOfBombs = (gameDifficulty: GameDifficulty, customSettings: MinesweeperCustomSettings) => {
  const difficulty = getGameDifficulty(gameDifficulty)
  if (difficulty === GameDifficulty.Custom) {
    if (customSettings) {
      return customSettings.numberOfBombs;
    } else {
      return 10;
    }
  } else {
    return mapDifficultyToGameBoard[difficulty].numberOfBombs;
  }
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

export const getShowVisual = (visualize: boolean): boolean => {
  if (typeof visualize !== 'boolean') {
    return false;
  }
  return visualize;
}
