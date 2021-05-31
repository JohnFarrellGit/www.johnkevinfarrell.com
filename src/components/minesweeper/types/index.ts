interface VisualCellOptions {
  color: string;
}

export interface Cell {
  id: number;
  isBomb: boolean;
  isCovered: boolean;
  isFlagged: boolean;
  neighbors: number[];
  neighborBombs: number;
  visualCellOptions?: VisualCellOptions;
}

export enum GameDifficulty {
  Beginner,
  Intermediate,
  Expert
}

export enum FaceType {
  Regular,
  Cat
}

export enum Faces {
  Shock,
  Blank,
  Happy,
  Dizzy,
  Celebration
}

export interface VisualCellInformation {
  cellIndex: number;
  color: string;
  uncover: boolean;
  flag: boolean;
  neighborBombs: number;
}

export enum ChangeType {
  GenerateBoard,
  GenerateNeighbors,
  ShuffleBombs,
  CalculateNeighborBombs,
  RevealClickedCell,
  RevealClickedCellAndNeighbors,
  LookForCellsToFlag,
  LookForCellsToReveal
}

export interface VisualOption {
  baseIntervalTimeMs: number;
  cells: VisualCellInformation[];
  changeType: ChangeType
}
