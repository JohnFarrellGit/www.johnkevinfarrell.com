import React, { useMemo, useReducer } from 'react'
import styled from 'styled-components'
import useInterval from '../../common/hooks/useInterval'
import Layout from '../../components/Layout'
import { GameCell } from '../../components/minesweeper/GameCell'
import { GameOptions } from '../../components/minesweeper/GameOptions'
import { GameStatus } from '../../components/minesweeper/GameStatus'
import SEO from '../../components/SEO'
import Title from '../../components/Title'

// TODO:

// implement game options // add a custom difficulty
// clicking face makes it spin and stick out tongue, use of bezier for cool looking spin
// right click spin, left click switch to kitties
// fix styling for game status so text isn't hidden
// responsive design (cell size, game size etc, flag and bomb size)

// personal leaderboard/history (?), useLocalStorage, useIndexedDB
// original sounds, useSound(), Josh W Comeau
// game to always be completable, no 50/50 problem (try and solve first, if not possible recreate?)
// implement a hinter function

// hold on mobile for flag

// performance improvements (memorisation of components etc.)

export enum GameDifficulty {
  Beginner,
  Intermediate,
  Expert,
  Custom
}

interface BoardConfiguration {
  numberOfRows: number;
  numberOfColumns: number;
  numberOfBombs: number;
  display: string;
}

export const mapDifficultyToGameBoard: Record<GameDifficulty, BoardConfiguration> = {
  [GameDifficulty.Beginner]: {
    numberOfRows: 10,
    numberOfColumns: 10,
    numberOfBombs: 10,
    display: 'Beginner'
  },
  [GameDifficulty.Intermediate]: {
    numberOfRows: 15,
    numberOfColumns: 15,
    numberOfBombs: 40,
    display: 'Intermediate'
  },
  [GameDifficulty.Expert]: {
    numberOfRows: 16,
    numberOfColumns: 30,
    numberOfBombs: 99,
    display: 'Expert'
  },
  [GameDifficulty.Custom]: {
    numberOfRows: 1,
    numberOfColumns: 1,
    numberOfBombs: 1,
    display: 'Custom'
  }
}

// optional cat faces if you click the face to switch between
export enum Faces {
  Shock = '😮',
  Blank = '😶',
  Happy = '🙂',
  Dizzy = '😵',
  Celebration = '🥳',
  Wacky = '🤪'
}

const generateBoard = (rows: number, columns: number) => {
  return new Array(rows * columns).fill(null).map((_, index) => ({
    isBomb: false,
    isCovered: true,
    isFlagged: false,
    id: index,
    neighbors: generateNeighbors(index, columns),
    neighborBombs: 0
  }))
}

const generateNeighbors = (cellNumber: number, columns: number): number[] => {
  const neighborCoordsLeft: [number, number][] = [
    [-1, 1],
    [-1, 0],
    [-1, -1]
  ]
  const neighborCoordsMiddle: [number, number][] = [
    [0, 1],
    [0, -1]
  ]
  const neighborCoordsRight: [number, number][] = [
    [1, 1],
    [1, 0],
    [1, -1]
  ]

  const gridN = []

  if (cellNumber % columns !== 0) {
    for (let i = 0; i < neighborCoordsLeft.length; i++) {
      const [x, y] = neighborCoordsLeft[i]
      gridN.push(cellNumber + x + y * columns)
    }
  }
  for (let i = 0; i < neighborCoordsMiddle.length; i++) {
    const [x, y] = neighborCoordsMiddle[i]
    gridN.push(cellNumber + x + y * columns)
  }
  if ((cellNumber + 1) % columns !== 0) {
    for (let i = 0; i < neighborCoordsRight.length; i++) {
      const [x, y] = neighborCoordsRight[i]
      gridN.push(cellNumber + x + y * columns)
    }
  }

  return gridN;
}

interface Cell {
  isBomb: boolean;
  isCovered: boolean;
  isFlagged: boolean;
  id: number;
  neighbors: number[];
  neighborBombs: number;
}

interface State {
  rows: number,
  columns: number,
  board: Cell[];
  gameDifficulty: GameDifficulty;
  numberOfBombs: number;
  flagsPlaced: number;
  isPlaying: boolean;
  isDead: boolean;
  isWinner: boolean,
  face: Faces;
  timer: number;
}

type Action =
  | { type: 'UpdateTimer' }
  | { type: 'HoldCell', cellIndex: number }
  | { type: 'ClickCell', cellIndex: number }
  | { type: 'PlaceFlag', cellIndex: number }
  | { type: 'RemoveFlag', cellIndex: number }
  | { type: 'UpdateConfiguration', rows: number, columns: number, numberOfBombs: number }

// this function could possibly be more efficient?
// board gets slow when it is large, maybe just due to dom updates...
const revealCells = (cellIndex: number, board: Cell[]): {
  board: Cell[],
  hasWon: boolean,
  hasLost: boolean
} => {
  if (board[cellIndex]?.isBomb) {
    const newCell = {
      ...board[cellIndex],
      isCovered: false
    }
    board[cellIndex] = newCell;

    return {
      board,
      hasWon: false,
      hasLost: true
    }
  }

  const queue: number[] = [cellIndex];
  const visitedCells: Set<number> = new Set();

  while (queue.length > 0) {
    const currentCellIndex = queue.pop() as number;
    if (board[currentCellIndex] === undefined || !board[currentCellIndex].isCovered || board[currentCellIndex].isFlagged) {
      continue;
    }
    visitedCells.add(currentCellIndex);

    const newCell = {
      ...board[currentCellIndex],
      isCovered: false
    }

    let numberOfBombs = 0;
    for (let i = 0; i < newCell.neighbors.length; i++) {
      if (board[newCell.neighbors[i]]?.isBomb) numberOfBombs++;
    }
    newCell.neighborBombs = numberOfBombs;

    if (newCell.neighborBombs === 0) {
      for (let i = 0; i < newCell.neighbors.length; i++) {
        if (!visitedCells.has(newCell.neighbors[i])) {
          queue.push(newCell.neighbors[i]);
        }
      }
    }

    board[currentCellIndex] = newCell
  }

  return {
    board,
    hasWon: board.filter(cell => !cell.isCovered).length === board.length - board.filter(cell => cell.isBomb).length,
    hasLost: false
  }
}

const minesweeperReducer = (state: State, action: Action): State => {
  switch (action.type) {

    case 'UpdateTimer': {
      if (state.isPlaying) {
        return {
          ...state,
          timer: state.timer + 1
        };
      }
      return {
        ...state
      }
    }

    case 'HoldCell': {

      if (state.isPlaying && (!state.board[action.cellIndex].isCovered || state.board[action.cellIndex].isFlagged) && state.isDead && state.isWinner) {
        return {
          ...state,
        }
      }

      return {
        ...state,
        face: Faces.Shock
      }
    }

    case 'ClickCell': {
      const newBoard = [...state.board];

      if (state.isPlaying && (!state.board[action.cellIndex].isCovered || state.board[action.cellIndex].isFlagged)) {
        return {
          ...state,
          face: Faces.Happy
        }
      }

      // handle resetting the game after winning or losing
      if (state.isDead || state.isWinner) {
        return {
          ...state,
          board: generateBoard(state.rows, state.columns),
          flagsPlaced: 0,
          isPlaying: false,
          isDead: false,
          isWinner: false,
          face: Faces.Blank,
          timer: 0
        }
      }
      // handle if not started yet, create board then reveal changes
      if (!state.isPlaying) {

        let bombsLeft = state.numberOfBombs;
        const possibleBombLocations = state.board.map(el => el.id).filter(id => id !== action.cellIndex);

        // fisher-yates random shuffling algorithm
        for (let i = possibleBombLocations.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i)
          const temp = possibleBombLocations[i]
          possibleBombLocations[i] = possibleBombLocations[j]
          possibleBombLocations[j] = temp
        }

        while (bombsLeft > 0) {
          const randomBombLocation = possibleBombLocations.pop() as number;
          newBoard[randomBombLocation] = {
            ...newBoard[randomBombLocation],
            isBomb: true
          }
          bombsLeft--;
        }

        const boardWithCellsRevealed = revealCells(action.cellIndex, newBoard);

        return {
          ...state,
          board: boardWithCellsRevealed.board,
          flagsPlaced: 0,
          isPlaying: true,
          isDead: boardWithCellsRevealed.hasLost,
          isWinner: boardWithCellsRevealed.hasWon,
          face: Faces.Happy,
          timer: 0
        }
      }

      const boardWithCellsRevealed = revealCells(action.cellIndex, newBoard);

      return {
        ...state,
        board: boardWithCellsRevealed.board,
        isPlaying: !boardWithCellsRevealed.hasLost && !boardWithCellsRevealed.hasWon,
        isDead: boardWithCellsRevealed.hasLost,
        isWinner: boardWithCellsRevealed.hasWon,
        face: boardWithCellsRevealed.hasLost ? Faces.Dizzy : boardWithCellsRevealed.hasWon ? Faces.Celebration : Faces.Happy,
      }
    }

    case 'PlaceFlag': {
      if (
        !state.board[action.cellIndex].isCovered ||
        !state.isPlaying ||
        (state.numberOfBombs === state.flagsPlaced && !state.board[action.cellIndex].isFlagged)
      ) {
        return {
          ...state
        }
      }

      const newBoard = [...state.board];
      const newCell = { ...newBoard[action.cellIndex] }
      newCell.isFlagged = !newBoard[action.cellIndex].isFlagged;
      newBoard[action.cellIndex] = newCell;
      return {
        ...state,
        flagsPlaced: state.flagsPlaced + (newCell.isFlagged ? 1 : -1),
        board: newBoard
      }
    }

    case 'UpdateConfiguration': {
      if (state.isPlaying) {
        return {
          ...state
        }
      } else {
        return {
          ...state,
          rows: action.rows,
          columns: action.columns,
          numberOfBombs: action.numberOfBombs,
          board: generateBoard(action.columns, action.rows)
        }
      }
    }

    default:
      return {
        ...state
      }
  }
}

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

  const updateDifficulty = (rows: number, columns: number, numberOfBombs: number) => {
    dispatch({ type: 'UpdateConfiguration', rows, columns, numberOfBombs })
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
        <GameContainer>
          <GameOptions
            isPlaying={gameState.isPlaying}
            updateDifficulty={updateDifficulty}
          />
          <GameStatus
            bombsLeft={gameState.numberOfBombs - gameState.flagsPlaced}
            totalBombs={gameState.numberOfBombs}
            face={gameState.face}
            timePlayed={gameState.timer}
          />
          <PlayingContainer>
            <GridContainer columns={gameState.columns}>
              {gameCells}
            </GridContainer>
          </PlayingContainer>
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

const GameContainer = styled.div`
  border-top: #ccc 3px solid;
  border-right: #ccc 3px solid;
  border-bottom: #777 3px solid;
  border-left: #777 3px solid;
  width: 80%;
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

interface CellI {
  isCovered: boolean;
  isBomb: boolean;
}

const Cell = styled.div`
  width: 20px;
  height: 20px;
  border: solid 1px white;
  background-color: ${(props: CellI) => (props.isCovered ? 'gray' : props.isBomb ? 'red' : 'green')};
  display: flex;
  justify-content: center;
  cursor: pointer;
  line-height: 20px;
`
