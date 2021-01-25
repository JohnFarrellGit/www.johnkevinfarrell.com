import React, { useMemo, useReducer } from 'react'
import styled from 'styled-components'
import useInterval from '../../common/hooks/useInterval'
import Layout from '../../components/Layout'
import { GameCell } from '../../components/minesweeper/GameCell'
import { GameOptions } from '../../components/minesweeper/GameOptions'
import { GameStatus } from '../../components/minesweeper/GameStatus'
import { PreviousResults } from '../../components/minesweeper/PreviousResults'
import { Faces, FaceType, GameDifficulty, generateBoard, minesweeperReducer } from '../../components/minesweeper/reducer'
import SEO from '../../components/SEO'
import Title from '../../components/Title'

// TODO:

// make the input size smaller for game controls
// remember if cat face or normal face using localStorage
// bug when changing to expert, click top left, is rows and columns mixed up??
// responsive text sizing - we don't want overflowing game status on a small screen, maybe just hide it on a phone?
// responsive design (cell size, game size etc, flag and bomb size)
// resolve issue of shifting game options as width grows
// neighbor cell color plus do we want it to bolder text?
// fix custom difficulty - doesn't seem to be working(?)
// clicking face makes it spin and stick out tongue, use of bezier for cool looking spin
// if win reveal the whole board - red are bombs, leave flags if flagged, show
// if bomb highlight red the cell
// give instructions for the game and how to play

// keyboard controls + accessibility


// fix folder structure
// original sounds, useSound(), Josh W Comeau
// game to always be completable, no 50/50 problem (try and solve first, if not possible recreate?)
// implement a hinter function

// make text non selectable for game options
// cell size needs to be slightly bigger, will impact responsive design and bomb/flag size

// performance improvements (memorisation of components etc.)

// BUGS

// fixing custom stuff (especially when very low or high bomb count, seems broken with neighbors)
// on won or lose changing difficulty causing incorrect bombs to display

const minesweeper = () => {

  const [gameState, dispatch] = useReducer(minesweeperReducer, {
    rows: 15,
    columns: 15,
    gameDifficulty: GameDifficulty.Intermediate,
    board: generateBoard(15, 15),
    numberOfBombs: 20,
    isPlaying: false,
    isDead: false,
    isWinner: false,
    face: Faces.Blank,
    faceType: FaceType.Regular,
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
    if (gameDifficulty === GameDifficulty.Beginner) {
      dispatch({ type: 'UpdateConfiguration', gameDifficulty, rows: 10, columns: 10, numberOfBombs: 10 })
    } else if (gameDifficulty === GameDifficulty.Intermediate) {
      dispatch({ type: 'UpdateConfiguration', gameDifficulty, rows: 15, columns: 15, numberOfBombs: 40 })
    } else if (gameDifficulty === GameDifficulty.Expert) {
      dispatch({ type: 'UpdateConfiguration', gameDifficulty, rows: 16, columns: 30, numberOfBombs: 99 })
    } else {
      if (rows && columns && numberOfBombs) {
        dispatch({ type: 'UpdateConfiguration', gameDifficulty, rows, columns, numberOfBombs })
      }
    }
  }

  const leftClickFace = () => {
    dispatch({ type: 'UpdateFaceType' })
  }

  const rightClickFace = () => {
    dispatch({ type: 'UpdateFaceType' })
  }

  const gameCells = useMemo(() => gameState.board.map((gameCell) => (
    <GameCell
      isCovered={gameCell.isCovered}
      isBomb={gameCell.isBomb}
      isFlagged={gameCell.isFlagged}
      neighborBombs={gameCell.neighborBombs}
      id={gameCell.id}
      leftClick={leftClickCell}
      rightClick={rightClickCell}
      holdCell={holdCell}
      key={gameCell.id}
    />
  )), [gameState.board])

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
            leftClickFace={leftClickFace}
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

export default minesweeper

const Main = styled.main`
  margin-bottom: 20px;
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
  width: ${(props: GameContainerI) => `${(Number(props.columns) * 20) + 40}px`};

  @media(max-width: 600px) {
    min-width: 500px;
    width: ${(props: GameContainerI) => `${(Number(props.columns) * 20)}px`};
  }

  @media(max-width: 500px) {
    min-width: 400px;
    width: ${(props: GameContainerI) => `${(Number(props.columns) * 20)}px`};
  }

  @media(max-width: 400px) {
    min-width: 300px;
    width: ${(props: GameContainerI) => `${(Number(props.columns) * 20)}px`};
  }
`

interface GridContainerI {
  columns: number;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props: GridContainerI) => `repeat(${props.columns}, 20px)`};
`

const PlayingContainer = styled.div`
  display: flex;
  justify-content: center;
  background: #E5E5E5;
`
