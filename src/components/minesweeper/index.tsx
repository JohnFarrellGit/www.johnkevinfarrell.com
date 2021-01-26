import React, { useEffect } from "react";
import { useMemo } from "react";
import { useReducer } from "react";
import styled from "styled-components";
import useInterval from "../../common/hooks/useInterval";
import Layout from "../Layout";
import SEO from "../SEO";
import Title from "../Title";
import { GameCell } from "./GameCell";
import { GameOptions, mapDifficultyToGameBoard } from "./GameOptions";
import { GameStatus } from "./GameStatus";
import { PreviousResults } from "./PreviousResults";
import { Faces, FaceType, GameDifficulty, generateBoard, minesweeperReducer } from "./reducer";

interface MinesweeperI {
  localDifficulty: GameDifficulty;
  setLocalStorageValue: React.Dispatch<React.SetStateAction<GameDifficulty>>;
  localFaceType: FaceType;
  setLocalFaceType: React.Dispatch<React.SetStateAction<FaceType>>;
}

export const Minesweeper = ({
  localDifficulty,
  setLocalStorageValue,
  localFaceType,
  setLocalFaceType }: MinesweeperI) => {

  const getGameDifficulty = () => {
    if ((typeof localDifficulty === "number") && (localDifficulty >= 0) && (localDifficulty <= 3)) {
      return localDifficulty;
    }
    return GameDifficulty.Beginner;
  }

  const getFaceType = () => {
    if ((typeof localFaceType === "number") && (localFaceType >= 0) && (localFaceType <= 1)) {
      return localFaceType;
    }
    return FaceType.Regular
  }

  const getNumberOfRows = () => {
    const difficulty = getGameDifficulty()
    if (difficulty === GameDifficulty.Custom) {
      return 10// get our rows
    } else {
      return mapDifficultyToGameBoard[difficulty].rows;
    }
  }

  const getNumberOfColumns = () => {
    const difficulty = getGameDifficulty()
    if (difficulty === GameDifficulty.Custom) {
      return 10// get our columns
    } else {
      return mapDifficultyToGameBoard[difficulty].columns;
    }
  }

  const getNumberOfBombs = () => {
    const difficulty = getGameDifficulty()
    if (difficulty === GameDifficulty.Custom) {
      return 10// get our bombs
    } else {
      return mapDifficultyToGameBoard[difficulty].numberOfBombs;
    }
  }

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
    display: false
  }

  const [gameState, dispatch] = useReducer(minesweeperReducer, initialGameState)

  useEffect(() => {
    const gameDifficulty = getGameDifficulty();
    if (gameDifficulty === GameDifficulty.Custom) {
      dispatch({
        type: 'Init',
        gameDifficulty,
        customDifficulty: {
          rows: getNumberOfRows(),
          columns: getNumberOfColumns(),
          numberOfBombs: getNumberOfBombs(),
        },
        faceType: getFaceType()
      })
    } else {
      dispatch({
        type: 'Init',
        gameDifficulty,
        faceType: getFaceType()
      })
    }
  }, [])

  useInterval(() => dispatch({ type: 'UpdateTimer' }), 1000);

  const leftClickCell = (cellIndex: number) => {
    dispatch({ type: 'ClickCell', cellIndex })
  }

  const rightClickCell = (cellIndex: number) => {
    dispatch({ type: 'PlaceFlag', cellIndex })
  }

  const holdCell = (cellIndex: number) => {
    dispatch({ type: 'HoldCell', cellIndex })
  }

  const updateDifficulty = (gameDifficulty: GameDifficulty, rows?: number, columns?: number, numberOfBombs?: number) => {
    setLocalStorageValue(gameDifficulty);
    if (gameDifficulty === GameDifficulty.Custom) {
      if (rows && columns && numberOfBombs) {
        dispatch({ type: 'UpdateConfiguration', gameDifficulty, rows, columns, numberOfBombs })
      }
    } else {
      dispatch({ type: 'UpdateConfiguration', gameDifficulty })
    }
  }

  const rightClickFace = () => {
    setLocalFaceType(gameState.faceType === FaceType.Regular ? FaceType.Cat : FaceType.Regular);
    dispatch({ type: 'UpdateFaceType' })
  }

  const gameCells = useMemo(() => gameState.board !== undefined && gameState.display ? gameState.board.map((gameCell) => (
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
  )) : null, [gameState.board])

  return (
    <Layout>
      <SEO title="Minesweeper" description="Simple Minesweeper Clone" />
      <Title title="Minesweeper" />
      <Main>
        <GameContainer columns={gameState.columns}>
          <GameOptions
            isPlaying={gameState.isPlaying}
            difficulty={gameState.gameDifficulty}
            rows={gameState.rows}
            columns={gameState.columns}
            numberOfBombs={gameState.numberOfBombs}
            updateDifficulty={updateDifficulty}
          />
          <GameStatus
            bombsLeft={gameState.numberOfBombs - gameState.flagsPlaced}
            totalBombs={gameState.numberOfBombs}
            faceType={gameState.faceType}
            face={gameState.face}
            timePlayed={gameState.timer}
            rightClickFace={rightClickFace}
          />
          <PlayingContainer>
            <GridContainer columns={gameState.columns}>
              {gameCells}
            </GridContainer>
          </PlayingContainer>
          <PreviousResults
            isWinner={gameState.isWinner}
            gameDifficulty={gameState.gameDifficulty}
            timer={gameState.timer}
          />
        </GameContainer>
      </Main>
    </Layout>
  )
}

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