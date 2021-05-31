import {
  Cell,
  Faces,
  FaceType,
  GameDifficulty,
  VisualOption
} from "../types";

import {
  autoFlag,
  autoPlay,
  autoReveal,
  clickCell,
  holdCell,
  init,
  placeFlag,
  updateConfiguration,
  updateFaceType,
  updateTimer,
  switchShowVisual,
  visualDisplay,
  switchEdgelessMode
} from "./functions";

export interface State {
  rows: number,
  columns: number,
  board: Cell[];
  numberOfBombs: number;
  gameDifficulty: GameDifficulty;
  isPlaying: boolean;
  isDead: boolean;
  isWinner: boolean,
  face: Faces;
  faceType: FaceType;
  timer: number;
  display: boolean;
  autoReveal: boolean;
  autoFlag: boolean;
  autoPlay: boolean;
  showVisual: boolean;
  visualSteps: VisualOption[];
  edgelessMode: boolean;
};

export type Action =
  |
  {
    type: 'Init',
    gameDifficulty: GameDifficulty,
    faceType: FaceType,
    autoReveal: boolean,
    autoFlag: boolean,
    autoPlay: boolean,
    showVisual: boolean,
    edgelessMode: boolean,
    customDifficulty?: { rows: number, columns: number, numberOfBombs: number }
  }
  | { type: 'UpdateTimer' }
  | { type: 'HoldCell', cellIndex: number }
  | { type: 'ClickCell', cellIndex: number }
  | { type: 'PlaceFlag', cellIndex: number }
  | { type: 'RemoveFlag', cellIndex: number }
  | { type: 'UpdateConfiguration', gameDifficulty: GameDifficulty, rows?: number, columns?: number, numberOfBombs?: number }
  | { type: 'UpdateFaceType' }
  | { type: 'AddToScores' }
  | { type: 'AutoReveal' }
  | { type: 'AutoFlag' }
  | { type: 'AutoPlay' }
  | { type: 'SwitchShowVisual' }
  | { type: 'VisualDisplay', visualSteps: VisualOption[] }
  | { type: 'SwitchEdgelessMode' }

export const minesweeperReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Init': return init(action);
    case 'UpdateTimer': return updateTimer(state);
    case 'HoldCell': return holdCell(state, action);
    case 'ClickCell': return clickCell(state, action);
    case 'PlaceFlag': return placeFlag(state, action);
    case 'UpdateConfiguration': return updateConfiguration(state, action);
    case 'UpdateFaceType': return updateFaceType(state);
    case 'AutoReveal': return autoReveal(state);
    case 'AutoFlag': return autoFlag(state);
    case 'AutoPlay': return autoPlay(state);
    case 'SwitchShowVisual': return switchShowVisual(state);
    case 'VisualDisplay': return visualDisplay(state, action);
    case 'SwitchEdgelessMode': return switchEdgelessMode(state);
    default: return state;
  };
};
