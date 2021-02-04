import { Cell, Faces, FaceType, GameDifficulty } from "../types";
import { autoReveal, clickCell, holdCell, init, placeFlag, updateConfiguration, updateFaceType, updateTimer } from "./functions";

export interface State {
  rows: number,
  columns: number,
  board: Cell[];
  numberOfBombs: number;
  gameDifficulty: GameDifficulty;
  flagsPlaced: number;
  isPlaying: boolean;
  isDead: boolean;
  isWinner: boolean,
  face: Faces;
  faceType: FaceType;
  timer: number;
  display: boolean;
  autoReveal: boolean;
};

export type Action =
  | { type: 'Init', gameDifficulty: GameDifficulty, faceType: FaceType, autoReveal: boolean, customDifficulty?: { rows: number, columns: number, numberOfBombs: number } }
  | { type: 'UpdateTimer' }
  | { type: 'HoldCell', cellIndex: number }
  | { type: 'ClickCell', cellIndex: number }
  | { type: 'PlaceFlag', cellIndex: number }
  | { type: 'RemoveFlag', cellIndex: number }
  | { type: 'UpdateConfiguration', gameDifficulty: GameDifficulty, rows?: number, columns?: number, numberOfBombs?: number }
  | { type: 'UpdateFaceType' }
  | { type: 'AddToScores' }
  | { type: 'AutoReveal' }

export const minesweeperReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Init': return init(action);
    case 'UpdateTimer': return updateTimer(state);
    case 'HoldCell': return holdCell(state, action);
    case 'ClickCell': return clickCell(state, action)
    case 'PlaceFlag': return placeFlag(state, action);
    case 'UpdateConfiguration': return updateConfiguration(state, action);
    case 'UpdateFaceType': return updateFaceType(state);
    case 'AutoReveal': return autoReveal(state);
    default: return state;
  };
};
