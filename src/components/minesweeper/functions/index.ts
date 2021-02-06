
import { autoFlagger } from "./autoFlagger";
import { autoPlayer } from "./autoPlayer";
import { autoPlayerProbabilistic } from "./autoPlayerProbabilistic";
import { generateBoard } from "./generateBoard";
import { generateNeighbors } from "./generateNeighbors";
import { getAutoPlay, getAutoReveal, getCustomBoardConfig, getFaceType, getGameDifficulty } from "./getLocalStorage";
import { revealCells } from "./revealCells";

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
  getAutoPlay
}