import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import styled from "styled-components";

import useInterval from "../../common/hooks/useInterval";
import { MinesweeperCustomSettings } from "../../common/hooks/useLocalStorage";
import Layout from "../Layout";
import SEO from "../SEO";
import Title from "../Title";
import { GameCell, GameStatus, GameOptions, PreviousResults } from "./components";
import { VisualizerInformation } from "./components/VisualizerInformation";
import { getAutoReveal, getFaceType, getGameDifficulty, getAutoFlag, getAutoPlay, getShowVisual, getEdgelessMode } from "./functions";
import { getAdvancedAutoPlay } from "./functions/getLocalStorage";
import { minesweeperReducer } from "./reducer";
import { Faces, FaceType, GameDifficulty } from "./types";

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
    autoPlay: boolean;
    setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
    advancedAutoPlay: boolean;
    setAdvancedAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
    visualize: boolean;
    setVisualize: React.Dispatch<React.SetStateAction<boolean>>;
    edgelessMode: boolean;
    setEdgelessMode: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const initialGameState = {
  gameDifficulty: GameDifficulty.Beginner,
  rows: 10,
  columns: 10,
  numberOfBombs: 10,
  board: [],
  isPlaying: false,
  isDead: false,
  isWinner: false,
  face: Faces.Blank,
  faceType: FaceType.Regular,
  timer: 0,
  flagsPlaced: 0,
  display: false,
  autoReveal: true,
  autoFlag: false,
  autoPlay: false,
  advancedAutoPlay: false,
  showVisual: false,
  visualSteps: [],
  edgelessMode: false
};

export const Minesweeper = ({ localStorage }: MinesweeperI) => {

  const [gameState, dispatch] = useReducer(minesweeperReducer, initialGameState);

  useEffect(() => {
    dispatch({
      type: 'Init',
      gameDifficulty: getGameDifficulty(localStorage.difficulty),
      faceType: getFaceType(localStorage.faceType),
      autoReveal: getAutoReveal(localStorage.autoFlag),
      autoFlag: getAutoFlag(localStorage.autoFlag),
      autoPlay: getAutoPlay(localStorage.autoPlay),
      advancedAutoPlay: getAdvancedAutoPlay(localStorage.advancedAutoPlay),
      showVisual: getShowVisual(localStorage.visualize),
      edgelessMode: getEdgelessMode(localStorage.edgelessMode)
    });
  }, []);

  useEffect(() => {
    if (gameState.visualSteps.length >= 0) {
      // set interval loop through them whilst sending correct updates to our reducer!
      // if visual display is on we don't actually want to make the changes until here,
      // basically bank them all then loop through them in order displaying!
      // post cell display you also apply the change!

      if (gameState.visualSteps[gameState.visualSteps.length - 1]) {
        setTimeout(() => {
          dispatch({ type: 'VisualDisplay', visualSteps: gameState.visualSteps });
        }, gameState.visualSteps[gameState.visualSteps.length - 1].baseIntervalTimeMs)
      } else {
        // we might want to clear but not too quickly?
        console.log("end of visualiser")
      }
    }
  }, [gameState.visualSteps.length])

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

  const updateDifficulty = useCallback((gameDifficulty: GameDifficulty) => {
    dispatch({ type: 'UpdateConfiguration', gameDifficulty });
  }, []);

  const rightClickFace = useCallback(() => {
    localStorage.setFaceType(gameState.faceType === FaceType.Regular ? FaceType.Cat : FaceType.Regular);
    dispatch({ type: 'UpdateFaceType' });
  }, []);

  const switchAutoReveal = useCallback(() => {
    localStorage.setAutoReveal((prev) => !prev);
    dispatch({ type: 'AutoReveal' });
  }, []);

  const switchAutoFlag = useCallback(() => {
    localStorage.setAutoFlag((prev) => !prev);
    dispatch({ type: 'AutoFlag' })
  }, [])

  const switchAutoPlay = useCallback(() => {
    localStorage.setAutoPlay((prev) => !prev);
    dispatch({ type: 'AutoPlay' })
  }, []);

  const switchAdvancedAutoPlay = useCallback(() => {
    localStorage.setAdvancedAutoPlay((prev) => !prev);
    dispatch({ type: 'AdvancedAutoPlay' })
  }, [])

  const switchVisualize = useCallback(() => {
    localStorage.setVisualize((prev) => !prev);
    dispatch({ type: 'SwitchShowVisual' })
  }, [])

  const switchEdgelessMode = useCallback(() => {
    localStorage.setEdgelessMode((prev) => !prev);
    dispatch({ type: 'SwitchEdgelessMode' })
  }, [])

  const visualizerInformation = useMemo(() => gameState.showVisual ? <VisualizerInformation changeType={gameState.visualSteps[0]?.changeType} /> : null, [gameState.visualSteps.length])

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
              color={gameCell.visualCellOptions ? gameCell.visualCellOptions.color : undefined}
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
      customSettings={localStorage.customSettings}
      switchAutoReveal={switchAutoReveal}
      autoReveal={localStorage.autoReveal}
      switchAutoFlag={switchAutoFlag}
      autoFlag={localStorage.autoFlag}
      switchAutoPlay={switchAutoPlay}
      autoPlay={localStorage.autoPlay}
      switchVisualize={switchVisualize}
      advancedAutoPlay={localStorage.advancedAutoPlay}
      switchAdvancedAutoPlay={switchAdvancedAutoPlay}
      visualize={localStorage.visualize}
      edgelessMode={localStorage.edgelessMode}
      switchEdgeless={switchEdgelessMode}
    />
  ), [
    gameState.isPlaying,
    gameState.rows,
    gameState.columns,
    gameState.numberOfBombs,
    gameState.autoReveal,
    gameState.autoFlag,
    gameState.autoPlay,
    gameState.advancedAutoPlay,
    gameState.showVisual,
    gameState.edgelessMode
  ]);

  const previousResults = useMemo(() =>
    <PreviousResults
      isWinner={gameState.isWinner}
      gameDifficulty={gameState.gameDifficulty}
      timer={gameState.timer}
    />
    , [gameState.isWinner, gameState.gameDifficulty]);

  return (
    <Layout>
      {seo}
      {title}
      <Main>
        <GameContainer columns={gameState.columns}>
          {gameOptions}
          {visualizerInformation}
          <GameStatus
            bombsLeft={gameState.numberOfBombs - gameState.board.filter((el) => el.isFlagged).length}
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
