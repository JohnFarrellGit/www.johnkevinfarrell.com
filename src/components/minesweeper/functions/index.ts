
import { autoFlagger } from "./autoFlagger";
import { autoPlayer } from "./autoPlayer";
import { generateBoard } from "./generateBoard";
import { generateNeighbors } from "./generateNeighbors";
import { getAutoPlay, getAutoReveal, getCustomBoardConfig, getFaceType, getGameDifficulty } from "./getLocalStorage";
import { revealCells } from "./revealCells";

export {
  revealCells,
  autoFlagger,
  autoPlayer,
  generateNeighbors,
  generateBoard,
  getGameDifficulty,
  getFaceType,
  getCustomBoardConfig,
  getAutoReveal,
  getAutoPlay
}