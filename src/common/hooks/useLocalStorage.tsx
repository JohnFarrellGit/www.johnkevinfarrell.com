import React, { useEffect, useState } from 'react'
import { FaceType, GameDifficulty } from '../../components/minesweeper/types';

interface MinesweeperResults {
  [GameDifficulty.Beginner]: number[];
  [GameDifficulty.Intermediate]: number[];
  [GameDifficulty.Expert]: number[];
  [GameDifficulty.Custom]: number[];
}

export interface MinesweeperCustomSettings {
  rows: number,
  columns: number;
  numberOfBombs: number;
}

export enum LocalStorageKeys {
  MinesweeperResults = 'minesweeper-results',
  MinesweeperDifficulty = 'minesweeper-difficulty',
  MinesweeperFace = 'minesweeper-face',
  MinesweeperCustomSettings = 'minesweeper-custom-settings'
}

export interface LocalStorage {
  [LocalStorageKeys.MinesweeperResults]: MinesweeperResults;
  [LocalStorageKeys.MinesweeperDifficulty]: GameDifficulty;
  [LocalStorageKeys.MinesweeperFace]: FaceType;
  [LocalStorageKeys.MinesweeperCustomSettings]: MinesweeperCustomSettings;
}

interface LocalStorageReturnType<T extends keyof LocalStorage> {
  localStorageValue: LocalStorage[T];
  setLocalStorageValue: React.Dispatch<React.SetStateAction<LocalStorage[T]>>;
}

export const useLocalStorage = <T extends keyof LocalStorage>(key: T): LocalStorageReturnType<T> => {

  const LOCAL_STORAGE_DEFAULTS = {
    [LocalStorageKeys.MinesweeperResults]: {
      [GameDifficulty.Beginner]: [],
      [GameDifficulty.Intermediate]: [],
      [GameDifficulty.Expert]: []
    },
    [LocalStorageKeys.MinesweeperDifficulty]: GameDifficulty.Beginner,
    [LocalStorageKeys.MinesweeperFace]: FaceType.Regular,
    [LocalStorageKeys.MinesweeperCustomSettings]: {
      rows: 30,
      columns: 30,
      numberOfBombs: 200
    }
  };

  const [value, setValue] = useState(() => {
    if (isLocalStorageAvailable()) {
      const stickyValue = window.localStorage.getItem(key);

      if (stickyValue !== null) {
        try {
          return JSON.parse(stickyValue);
        } catch {
          return LOCAL_STORAGE_DEFAULTS[key];
        }
      } else {
        return LOCAL_STORAGE_DEFAULTS[key];
      }
    } else {
      return LOCAL_STORAGE_DEFAULTS[key];
    }
  })

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return {
    localStorageValue: value,
    setLocalStorageValue: setValue
  }
}

const isLocalStorageAvailable = (): boolean => {
  let storage;
  try {
    storage = window.localStorage;
    const test = "_test_";
    storage.setItem('test_local_storage', test);
    storage.removeItem('test_local_storage');
    return true;
  }
  catch (e: unknown) {
    return false;
  }
}
