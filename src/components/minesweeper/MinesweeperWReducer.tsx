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
  autoReveal: true
};

interface MinesweeperI {
  localDifficulty: GameDifficulty;
  setLocalStorageValue: React.Dispatch<React.SetStateAction<GameDifficulty>>;
  localFaceType: FaceType;
  setLocalFaceType: React.Dispatch<React.SetStateAction<FaceType>>;
  localCustomSettings: MinesweeperCustomSettings;
  setLocalCustomSettings: React.Dispatch<React.SetStateAction<MinesweeperCustomSettings>>;
  localAutoReveal: boolean;
  setLocalAutoReveal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MinesweeperWReducer = ({
  localDifficulty,
  setLocalStorageValue,
  localFaceType,
  setLocalFaceType,
  localCustomSettings,
  setLocalCustomSettings,
  localAutoReveal,
  setLocalAutoReveal
}: MinesweeperI) => {

  const [gameState, dispatch] = useReducer(minesweeperReducer, initialGameState);

  return (
    <Minesweeper
      localDifficulty={localDifficulty}
      setLocalStorageValue={setLocalStorageValue}
      localFaceType={localFaceType}
      setLocalFaceType={setLocalFaceType}
      localCustomSettings={localCustomSettings}
      setLocalCustomSettings={setLocalCustomSettings}
      localAutoReveal={localAutoReveal}
      setLocalAutoReveal={setLocalAutoReveal}
      gameState={gameState}
      dispatch={dispatch}
    />
  );
};
