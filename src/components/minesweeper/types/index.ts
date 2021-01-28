export interface Cell {
  id: number;
  isBomb: boolean;
  isCovered: boolean;
  isFlagged: boolean;
  neighbors: number[];
  neighborBombs: number;
}

export enum GameDifficulty {
  Beginner,
  Intermediate,
  Expert,
  Custom
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
