import React, { useMemo, useReducer } from 'react'
import styled from 'styled-components'
import useInterval from '../../common/hooks/useInterval'
import { LocalStorageKeys, useLocalStorage } from '../../common/hooks/useLocalStorage'
import Layout from '../../components/Layout'
import { GameCell } from '../../components/minesweeper/GameCell'
import { GameOptions, mapDifficultyToGameBoard } from '../../components/minesweeper/GameOptions'
import { GameStatus } from '../../components/minesweeper/GameStatus'
import { PreviousResults } from '../../components/minesweeper/PreviousResults'
import { Faces, FaceType, GameDifficulty, generateBoard, minesweeperReducer } from '../../components/minesweeper/reducer'
import SEO from '../../components/SEO'
import Title from '../../components/Title'

// TODO:

// should no longer create columns, rows etc by default, need to get from difficulty programmatically, is a bug when we load from saved difficulty!
// rows, columns have to be optional (only when making from custom!), we also no longer pass a board but return one!

// bug when first click also wins game (if 1 bomb exists in custom for example)

// responsive design (cell size, game size etc, flag and bomb size) - can our cell size and other responsive change based on number of columns
// https://engageinteractive.co.uk/blog/em-vs-rem-vs-px
// we can flex column the options and status (instead of hiding status), we could also set a max columns of 25 * screenwidth?

// resolve issue of shifting game options as width grows

// give instructions for the game and how to play

// keyboard controls + accessibility

// improve folder structure
// original sounds, useSound(), Josh W Comeau
// game to always be completable, no 50/50 problem (try and solve first, if not possible recreate?)
// implement a hinter function

// make text non selectable for game options
// cell size needs to be slightly bigger, will impact responsive design and bomb/flag size

// performance improvements (memorisation of components etc.)

// connect site/projects page to strapi

// BUGS

// fix custom difficulty - doesn't seem to be working(?)
// fixing custom stuff (especially when very low or high bomb count, seems broken with neighbors)
// bug when changing to expert, click top left, is rows and columns mixed up??

const minesweeper = () => {

  const { localStorageValue: localDifficulty, setLocalStorageValue } = useLocalStorage(LocalStorageKeys.MinesweeperDifficulty);
  const { localStorageValue: localFaceType, setLocalStorageValue: setLocalFaceType } = useLocalStorage(LocalStorageKeys.MinesweeperFace);

  const getGameDifficulty = () => {
    if ((typeof localDifficulty === "number") && (localDifficulty >= 0) && (localDifficulty <= 2)) {
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

  const [gameState, dispatch] = useReducer(minesweeperReducer, {
    gameDifficulty: getGameDifficulty(),
    rows: mapDifficultyToGameBoard[getGameDifficulty()].numberOfRows,
    columns: mapDifficultyToGameBoard[getGameDifficulty()].numberOfColumns,
    numberOfBombs: mapDifficultyToGameBoard[getGameDifficulty()].numberOfBombs,
    board: generateBoard(mapDifficultyToGameBoard[getGameDifficulty()].numberOfRows, mapDifficultyToGameBoard[getGameDifficulty()].numberOfColumns),
    isPlaying: false,
    isDead: false,
    isWinner: false,
    face: Faces.Blank,
    faceType: getFaceType(),
    timer: 0,
    flagsPlaced: 0
  })

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

  const gameCells = useMemo(() => gameState.board !== undefined ? gameState.board.map((gameCell) => (
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
        <GameContainer columns={gameState.columns !== undefined ? gameState.columns : 10}>
          <GameOptions
            isPlaying={gameState.isPlaying}
            difficulty={gameState.gameDifficulty}
            rows={gameState.rows !== undefined ? gameState.rows : 10}
            columns={gameState.columns !== undefined ? gameState.columns : 10}
            numberOfBombs={gameState.numberOfBombs !== undefined ? gameState.numberOfBombs : 10}
            updateDifficulty={updateDifficulty}
          />
          <GameStatus
            bombsLeft={(gameState.numberOfBombs !== undefined ? gameState.numberOfBombs : 10) - gameState.flagsPlaced}
            totalBombs={gameState.numberOfBombs !== undefined ? gameState.numberOfBombs : 10}
            faceType={gameState.faceType}
            face={gameState.face}
            timePlayed={gameState.timer}
            rightClickFace={rightClickFace}
          />
          <PlayingContainer>
            <GridContainer columns={gameState.columns !== undefined ? gameState.columns : 10}>
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

export default minesweeper

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

// if number of columns * 30px is larger than screen width we have an issue, make cells smaller
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props: GridContainerI) => `repeat(${props.columns}, 30px)`};
`

const PlayingContainer = styled.div`
  display: flex;
  justify-content: center;
  background: #E5E5E5;
`
