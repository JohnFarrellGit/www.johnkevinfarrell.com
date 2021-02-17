import { revealCells } from "./revealCells";
import { autoFlagger } from "./autoFlagger";
import { autoPlayer } from "./autoPlayer";
import { autoPlayerProbabilistic } from "./autoPlayerProbabilistic";
import { generateBoard } from "./generateBoard";
import { generateNeighbors } from "./generateNeighbors";
import { getAutoFlag, getAutoPlay, getAutoReveal, getCustomBoardConfig, getEdgelessMode, getFaceType, getGameDifficulty, getShowVisual } from "./getLocalStorage";

export {
  revealCells,
  autoFlagger,
  autoPlayer,
  autoPlayerProbabilistic,
  generateNeighbors,
  generateBoard,
  getGameDifficulty,
  getFaceType,
  getCustomBoardConfig,
  getAutoReveal,
  getAutoPlay,
  getAutoFlag,
  getShowVisual,
  getEdgelessMode
}