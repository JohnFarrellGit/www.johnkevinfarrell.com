
import { generateBoard } from "./generateBoard";
import { generateNeighbors } from "./generateNeighbors";
import { getAutoReveal, getCustomBoardConfig, getFaceType, getGameDifficulty } from "./getLocalStorage";
import { revealCells } from "./revealCells";

export {
  revealCells,
  generateNeighbors,
  generateBoard,
  getGameDifficulty,
  getFaceType,
  getCustomBoardConfig,
  getAutoReveal
}