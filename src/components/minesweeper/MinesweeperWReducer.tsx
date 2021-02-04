import React, { useReducer } from 'react';
import { MinesweeperCustomSettings } from '../../common/hooks/useLocalStorage';
import { generateBoard } from './functions';
import { Minesweeper } from './Minesweeper';
import { minesweeperReducer } from './reducer';
import { Faces, FaceType, GameDifficulty } from './types';

const initialGameState = {
  gameDifficulty: GameDifficulty.Beginner,
  rows: 10,
  columns: 10,
  numberOfBombs: 10,
  board: generateBoard(10, 10),
  isPlaying: false,
  isDead: false,
  isWinner: false,
  face: Faces.Blank,
  faceType: FaceType.Regular,
  timer: 0,
  flagsPlaced: 0,
  display: false,
  autoReveal: true,
  autoFlag: false
};

interface MinesweeperI {
  localStorage: {
    difficulty: GameDifficulty;
    setDifficulty: React.Dispatch<React.SetStateAction<GameDifficulty>>;
    faceType: FaceType;
    setFaceType: React.Dispatch<React.SetStateAction<FaceType>>;
    customSettings: MinesweeperCustomSettings;
    setCustomSettings: React.Dispatch<React.SetStateAction<MinesweeperCustomSettings>>;
    autoReveal: boolean;
    setAutoReveal: React.Dispatch<React.SetStateAction<boolean>>;
    autoFlag: boolean;
    setAutoFlag: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

export const MinesweeperWReducer = ({ localStorage }: MinesweeperI) => {

  const [gameState, dispatch] = useReducer(minesweeperReducer, initialGameState);

  return (
    <Minesweeper
      localStorage={localStorage}
      gameState={gameState}
      dispatch={dispatch}
    />
  );
};
