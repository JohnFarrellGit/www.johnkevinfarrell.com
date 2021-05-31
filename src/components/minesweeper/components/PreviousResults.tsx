import React, { useEffect } from 'react'
import styled from 'styled-components';
import { convertSecondsToMinutesAndSeconds } from '../../../common/functions/convertSecondsToHoursMinutesAndSeconds';
import { LocalStorageKeys, useLocalStorage } from '../../../common/hooks/useLocalStorage';
import { GameDifficulty } from '../types';

interface ResultsI {
  isWinner: boolean;
  gameDifficulty: GameDifficulty;
  timer: number;
}

const Results = ({ isWinner, gameDifficulty, timer }: ResultsI) => {
  const { localStorageValue: results, setLocalStorageValue } = useLocalStorage(LocalStorageKeys.MinesweeperResults);
  const fastest10 = results[gameDifficulty].slice(0, 10);

  useEffect(() => {
    if (isWinner) {
      const newResults = { ...results };
      const difficultySetting = gameDifficulty;
      const newResultsDifficulty = [...newResults[difficultySetting]];

      let i = 0;
      while (timer > newResultsDifficulty[i] && i < newResultsDifficulty.length) i++;
      newResultsDifficulty.splice(i, 0, timer);

      newResults[difficultySetting] = newResultsDifficulty;
      setLocalStorageValue(newResults)
    }
  }, [isWinner]);

  return (
    <ResultsContainer>
      <div>
        <WinContainer>
          <DisplayText>Win Count - {results[gameDifficulty].length}</DisplayText>
        </WinContainer>
        <TimesContainer>
          <TimesTitle>Best Times ({GameDifficulty[gameDifficulty]})</TimesTitle>
          {
            fastest10.map((res, index) => (
              <DisplayText key={index}>{index + 1}: {convertSecondsToMinutesAndSeconds(Number(res))}</DisplayText>
            ))
          }
        </TimesContainer>
      </div>
    </ResultsContainer>
  )
}

export const PreviousResults = React.memo(Results, (prevProps, newProps) => prevProps.isWinner === newProps.isWinner && prevProps.gameDifficulty === newProps.gameDifficulty)

const ResultsContainer = styled.div`
  border-top: 1px solid #777777;
  display: flex;
  justify-content: center;
  background: #BDBDBD;
`;

const WinContainer = styled.div`
  padding: 5px 20px 5px 20px;
  background-color: #E5E5E5;

  border-top: #ccc 3px solid;
  border-right: #ccc 3px solid;
  border-left: #777 3px solid;

  display: flex;
`;

const TimesContainer = styled.div`
  padding: 5px 20px 5px 20px;
  background-color: #E5E5E5;

  border-top: #ccc 3px solid;
  border-right: #ccc 3px solid;
  border-left: #777 3px solid;
`;

const TimesTitle = styled.p`
  color: black;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
`;

const DisplayText = styled.p`
  color: black;
  margin-bottom: 0px;
`;
