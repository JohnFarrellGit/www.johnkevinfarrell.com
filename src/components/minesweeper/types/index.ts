export interface Cell {
  isBomb: boolean;
  isCovered: boolean;
  isFlagged: boolean;
  id: number;
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
