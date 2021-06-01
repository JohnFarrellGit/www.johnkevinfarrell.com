import React from 'react'
import { LocalStorageKeys, MinesweeperCustomSettings, useLocalStorage } from '../../common/hooks/useLocalStorage';
import { Minesweeper } from './Minesweeper';
import { FaceType, GameDifficulty } from './types';

export const MinesweeperWLocalStorage = () => {

  const { localStorageValue: difficulty, setLocalStorageValue: setDifficulty } = useLocalStorage(LocalStorageKeys.MinesweeperDifficulty);
  const { localStorageValue: faceType, setLocalStorageValue: setFaceType } = useLocalStorage(LocalStorageKeys.MinesweeperFace);
  const { localStorageValue: customSettings, setLocalStorageValue: setCustomSettings } = useLocalStorage(LocalStorageKeys.MinesweeperCustomSettings);
  const { localStorageValue: autoReveal, setLocalStorageValue: setAutoReveal } = useLocalStorage(LocalStorageKeys.AutoReveal);
  const { localStorageValue: autoFlag, setLocalStorageValue: setAutoFlag } = useLocalStorage(LocalStorageKeys.AutoFlag);
  const { localStorageValue: autoPlay, setLocalStorageValue: setAutoPlay } = useLocalStorage(LocalStorageKeys.AutoPlay);
  const { localStorageValue: advancedAutoPlay, setLocalStorageValue: setAdvancedAutoPlay } = useLocalStorage(LocalStorageKeys.AdvancedAutoPlay);
  const { localStorageValue: visualize, setLocalStorageValue: setVisualize } = useLocalStorage(LocalStorageKeys.Visualize);
  const { localStorageValue: edgelessMode, setLocalStorageValue: setEdgelessMode } = useLocalStorage(LocalStorageKeys.EdgelessMode);

  const localStorage: {
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
    autoPlay: boolean;
    setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
    advancedAutoPlay: boolean;
    setAdvancedAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
    visualize: boolean;
    setVisualize: React.Dispatch<React.SetStateAction<boolean>>;
    edgelessMode: boolean;
    setEdgelessMode: React.Dispatch<React.SetStateAction<boolean>>;
  } = {
    difficulty,
    setDifficulty,
    faceType,
    setFaceType,
    customSettings,
    setCustomSettings,
    autoReveal,
    setAutoReveal,
    autoFlag,
    setAutoFlag,
    autoPlay,
    setAutoPlay,
    advancedAutoPlay,
    setAdvancedAutoPlay,
    visualize,
    setVisualize,
    edgelessMode,
    setEdgelessMode
  }

  return (
    <Minesweeper
      localStorage={localStorage}
    />
  );
};
