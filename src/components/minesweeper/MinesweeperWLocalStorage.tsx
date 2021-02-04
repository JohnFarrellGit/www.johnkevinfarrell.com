import React from 'react'
import { LocalStorageKeys, useLocalStorage } from '../../common/hooks/useLocalStorage';
import { MinesweeperWReducer } from './MinesweeperWReducer';

export const MinesweeperWLocalStorage = () => {

  const { localStorageValue: localDifficulty, setLocalStorageValue } = useLocalStorage(LocalStorageKeys.MinesweeperDifficulty);
  const { localStorageValue: localFaceType, setLocalStorageValue: setLocalFaceType } = useLocalStorage(LocalStorageKeys.MinesweeperFace);
  const { localStorageValue: localCustomSettings, setLocalStorageValue: setLocalCustomSettings } = useLocalStorage(LocalStorageKeys.MinesweeperCustomSettings);
  const { localStorageValue: localAutoReveal, setLocalStorageValue: setLocalAutoReveal } = useLocalStorage(LocalStorageKeys.AutoReveal);

  return (
    <MinesweeperWReducer
      localDifficulty={localDifficulty}
      setLocalStorageValue={setLocalStorageValue}
      localFaceType={localFaceType}
      setLocalFaceType={setLocalFaceType}
      localCustomSettings={localCustomSettings}
      setLocalCustomSettings={setLocalCustomSettings}
      localAutoReveal={localAutoReveal}
      setLocalAutoReveal={setLocalAutoReveal}
    />
  );
};
