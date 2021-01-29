import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";

import useInterval from "../../common/hooks/useInterval";
import { MinesweeperCustomSettings } from "../../common/hooks/useLocalStorage";
import Layout from "../Layout";
import SEO from "../SEO";
import Title from "../Title";
import { GameCell, GameStatus, GameOptions, PreviousResults } from "./components";
import { getCustomBoardConfig, getFaceType, getGameDifficulty } from "./functions";
import { Action, State } from "./reducer";
import { FaceType, GameDifficulty } from "./types";

interface MinesweeperI {
  localDifficulty: GameDifficulty;
  setLocalStorageValue: React.Dispatch<React.SetStateAction<GameDifficulty>>;
  localFaceType: FaceType;
  setLocalFaceType: React.Dispatch<React.SetStateAction<FaceType>>;
  localCustomSettings: MinesweeperCustomSettings;
  setLocalCustomSettings: React.Dispatch<React.SetStateAction<MinesweeperCustomSettings>>;
  gameState: State;
  dispatch: React.Dispatch<Action>;
};

export const Minesweeper = ({
  localDifficulty,
  setLocalStorageValue,
  localFaceType,
  setLocalFaceType,
  localCustomSettings,
  setLocalCustomSettings,
  gameState,
  dispatch
}: MinesweeperI) => {

  useEffect(() => {

    const gameDifficulty = getGameDifficulty(localDifficulty);

    if (gameDifficulty === GameDifficulty.Custom) {
      dispatch({
        type: 'Init',
        gameDifficulty,
        customDifficulty: getCustomBoardConfig(gameDifficulty, localCustomSettings),
        faceType: getFaceType(localFaceType)
      })
    } else {
      dispatch({
        type: 'Init',
        gameDifficulty,
        faceType: getFaceType(localFaceType)
      })
    }
  }, []);

  useInterval(() => dispatch({ type: 'UpdateTimer' }), 1000);

  const leftClickCell = useCallback((cellIndex: number) => {
    dispatch({ type: 'ClickCell', cellIndex })
  }, []);

  const rightClickCell = useCallback((cellIndex: number) => {
    dispatch({ type: 'PlaceFlag', cellIndex })
  }, []);

  const holdCell = useCallback((cellIndex: number) => {
    dispatch({ type: 'HoldCell', cellIndex })
  }, []);

  const updateDifficulty = useCallback((gameDifficulty: GameDifficulty, rows?: number, columns?: number, numberOfBombs?: number) => {
    setLocalStorageValue(gameDifficulty);
    if (gameDifficulty === GameDifficulty.Custom) {
      if (rows && columns && numberOfBombs) {
        setLocalCustomSettings({
          rows,
          columns,
          numberOfBombs
        });
        dispatch({ type: 'UpdateConfiguration', gameDifficulty, rows, columns, numberOfBombs });
      }
    } else {
      dispatch({ type: 'UpdateConfiguration', gameDifficulty });
    }
  }, []);

  const rightClickFace = useCallback(() => {
    setLocalFaceType(gameState.faceType === FaceType.Regular ? FaceType.Cat : FaceType.Regular);
    dispatch({ type: 'UpdateFaceType' });
  }, []);

  const gameCells = useMemo(() => gameState.display ?
    <PlayingContainer>
      <GridContainer columns={gameState.columns}>
        {
          gameState.board.map((gameCell) => (
            <GameCell
              isCovered={gameCell.isCovered}
              isBomb={gameCell.isBomb}
              isFlagged={gameCell.isFlagged}
              isWinner={gameState.isWinner}
              neighborBombs={gameCell.neighborBombs}
              id={gameCell.id}
              leftClick={leftClickCell}
              rightClick={rightClickCell}
              holdCell={holdCell}
              key={gameCell.id}
            />
          ))
        }
      </GridContainer>
    </PlayingContainer>
    : null, [gameState.board])

  const seo = useMemo(() => (
    <SEO title="Minesweeper" description="Simple Minesweeper Clone" />
  ), []);

  const title = useMemo(() => (
    <Title title="Minesweeper" />
  ), []);

  const gameOptions = useMemo(() => (
    <GameOptions
      isPlaying={gameState.isPlaying}
      difficulty={gameState.gameDifficulty}
      rows={gameState.rows}
      columns={gameState.columns}
      numberOfBombs={gameState.numberOfBombs}
      updateDifficulty={updateDifficulty}
      customSettings={localCustomSettings}
    />
  ), [gameState.isPlaying, gameState.rows, gameState.columns, gameState.numberOfBombs]);

  const previousResults = useMemo(() => gameState.gameDifficulty !== GameDifficulty.Custom ?
    <PreviousResults
      isWinner={gameState.isWinner}
      gameDifficulty={gameState.gameDifficulty}
      timer={gameState.timer}
    /> :
    null
    , [gameState.isWinner, gameState.gameDifficulty]);

  return (
    <Layout>
      {seo}
      {title}
      <Main>
        <GameContainer columns={gameState.columns}>
          {gameOptions}
          <GameStatus
            bombsLeft={gameState.numberOfBombs - gameState.flagsPlaced}
            totalBombs={gameState.numberOfBombs}
            faceType={gameState.faceType}
            face={gameState.face}
            timePlayed={gameState.timer}
            rightClickFace={rightClickFace}
          />
          {gameCells}
          {previousResults}
        </GameContainer>
      </Main>
    </Layout>
  )
};

const Main = styled.main`
  display: flex;
  justify-content: center;
`

interface GameContainerI {
  columns: number;
}

const GameContainer = styled.div`
  border-top: #ccc 3px solid;
  border-right: #ccc 3px solid;
  border-bottom: #777 3px solid;
  border-left: #777 3px solid;
  min-width: 600px;
  width: ${(props: GameContainerI) => `${(Number(props.columns) * 30) + 60}px`};

  @media(max-width: 600px) {
    min-width: 500px;
    width: ${(props: GameContainerI) => `${(Number(props.columns) * 30) + 5}px`};
  }

  @media(max-width: 500px) {
    min-width: 400px;
    width: ${(props: GameContainerI) => `${(Number(props.columns) * 30) + 5}px`};
  }

  @media(max-width: 400px) {
    min-width: 300px;
    width: ${(props: GameContainerI) => `${(Number(props.columns) * 30) + 5}px`};
  }
`

interface GridContainerI {
  columns: number;
}

// if number of columns * 30px is larger than screen width we have an issue, make cells smaller, make grid vertical
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props: GridContainerI) => `repeat(${props.columns}, 30px)`};
`

const PlayingContainer = styled.div`
  display: flex;
  justify-content: center;
  background: #E5E5E5;
`
