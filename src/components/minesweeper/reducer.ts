import { mapDifficultyToGameBoard } from "./GameOptions";

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

  const hasWon = board.filter(cell => !cell.isCovered).length === board.length - board.filter(cell => cell.isBomb).length
  if (hasWon) {
    for (let i = 0; i < board.length; i++) {
      board[i] = {
        ...board[i],
        isCovered: false
      }
    }
  }


  return {
    board,
    hasWon,
    hasLost: false
  }
}

interface Cell {
  isBomb: boolean;
  isCovered: boolean;
  isFlagged: boolean;
  id: number;
  neighbors: number[];
  neighborBombs: number;
}

export enum GameDifficulty {
  Beginner,
  Intermediate,
  Expert,
  Custom
}

interface State {
  rows: number,
  columns: number,
  board: Cell[];
  numberOfBombs: number;
  gameDifficulty: GameDifficulty;
  flagsPlaced: number;
  isPlaying: boolean;
  isDead: boolean;
  isWinner: boolean,
  face: Faces;
  faceType: FaceType;
  timer: number;
  display: boolean;
}

export enum FaceType {
  Regular,
  Cat
}

export enum Faces {
  Shock,
  Blank,
  Happy,
  Dizzy,
  Celebration
}

type Action =
  | { type: 'Init', gameDifficulty: GameDifficulty, faceType: FaceType, customDifficulty?: { rows: number, columns: number, numberOfBombs: number } }
  | { type: 'UpdateTimer' }
  | { type: 'HoldCell', cellIndex: number }
  | { type: 'ClickCell', cellIndex: number }
  | { type: 'PlaceFlag', cellIndex: number }
  | { type: 'RemoveFlag', cellIndex: number }
  | { type: 'UpdateConfiguration', gameDifficulty: GameDifficulty, rows?: number, columns?: number, numberOfBombs?: number }
  | { type: 'UpdateFaceType' }
  | { type: 'AddToScores' }

export const minesweeperReducer = (state: State, action: Action): State => {
  switch (action.type) {

    case 'Init': {

      let rows: number;
      let columns: number;
      let numberOfBombs: number;

      if (action.customDifficulty !== undefined) {
        rows = action.customDifficulty!.rows;
        columns = action.customDifficulty!.rows;
        numberOfBombs = action.customDifficulty!.rows;
      } else {
        rows = mapDifficultyToGameBoard[action.gameDifficulty].rows;
        columns = mapDifficultyToGameBoard[action.gameDifficulty].columns;
        numberOfBombs = mapDifficultyToGameBoard[action.gameDifficulty].numberOfBombs;
      }

      const board = generateBoard(rows, columns);

      return {
        ...state,
        gameDifficulty: action.gameDifficulty,
        faceType: action.faceType,
        rows,
        columns,
        numberOfBombs,
        board,
        isPlaying: false,
        isDead: false,
        isWinner: false,
        face: Faces.Blank,
        timer: 0,
        flagsPlaced: 0,
        display: true
      }
    }

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

      if (!state.isPlaying || state.isDead || state.isWinner || !state.board[action.cellIndex].isCovered || state.board[action.cellIndex].isFlagged) {
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
      const newBoard = [...state.board!];

      if (state.isPlaying && state.board && (!state.board[action.cellIndex].isCovered || state.board[action.cellIndex].isFlagged)) {
        return {
          ...state,
          face: Faces.Happy
        }
      }

      // handle resetting the game after winning or losing
      if (state.isDead || state.isWinner) {
        return {
          ...state,
          board: generateBoard(state.rows!, state.columns!),
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

        let bombsLeft = state.numberOfBombs || 0;
        const possibleBombLocations = state.board ? state.board.map(el => el.id).filter(id => id !== action.cellIndex) : [];

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
      if (state.board && !state.board[action.cellIndex].isCovered || !state.isPlaying) {
        return {
          ...state
        }
      }

      const newBoard = [...state.board!];
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
      }

      if (action.gameDifficulty === GameDifficulty.Custom && action.rows && action.columns && action.numberOfBombs) {
        return {
          ...state,
          gameDifficulty: action.gameDifficulty,
          rows: action.rows,
          columns: action.columns,
          numberOfBombs: action.numberOfBombs,
          board: generateBoard(action.columns, action.rows),
          flagsPlaced: 0,
          timer: 0,
          face: Faces.Blank,
          isPlaying: false,
          isDead: false,
          isWinner: false
        }
      }

      const { rows, columns, numberOfBombs } = mapDifficultyToGameBoard[action.gameDifficulty];

      return {
        ...state,
        gameDifficulty: action.gameDifficulty,
        rows,
        columns,
        numberOfBombs,
        board: generateBoard(rows, columns),
        flagsPlaced: 0,
        timer: 0,
        face: Faces.Blank,
        isPlaying: false,
        isDead: false,
        isWinner: false
      }
    }

    case 'UpdateFaceType': {
      if (state.faceType === FaceType.Regular) {
        return {
          ...state,
          faceType: FaceType.Cat,
        }
      } else {
        return {
          ...state,
          faceType: FaceType.Regular,
        }
      }
    }

    default:
      return {
        ...state
      }
  }
}

export const generateBoard = (rows: number, columns: number) => {
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

