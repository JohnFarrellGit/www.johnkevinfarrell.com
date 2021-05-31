import { GameDifficulty } from "../types";

interface BoardConfiguration {
  rows: number;
  columns: number;
  numberOfBombs: number;
  display: string;
};

export const mapDifficultyToGameBoard: Record<GameDifficulty, BoardConfiguration> = {
  [GameDifficulty.Beginner]: {
    rows: 10,
    columns: 10,
    numberOfBombs: 10,
    display: 'Beginner'
  },
  [GameDifficulty.Intermediate]: {
    rows: 15,
    columns: 15,
    numberOfBombs: 40,
    display: 'Intermediate'
  },
  [GameDifficulty.Expert]: {
    rows: 16,
    columns: 30,
    numberOfBombs: 99,
    display: 'Expert'
  }
};
