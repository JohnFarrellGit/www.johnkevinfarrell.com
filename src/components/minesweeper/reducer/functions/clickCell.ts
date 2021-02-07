import { State } from "..";
import { generateBoard, revealCells } from "../../functions";
import { ChangeType, Faces, VisualCellInformation } from "../../types";

export const clickCell = (state: State, action: { type: 'ClickCell', cellIndex: number }) => {
  const newBoard = [...state.board];

  if (state.isPlaying && (!state.board[action.cellIndex].isCovered || state.board[action.cellIndex].isFlagged)) {
    return {
      ...state,
      face: Faces.Happy
    }
  }

  // handle resetting the game after winning or losing
  if (state.isDead || state.isWinner) {
    // we could show clearing is ?
    // generateBoard could also return the steps involved in making the board, including the neighbors

    const { board, visualSteps } = generateBoard(state.rows, state.columns, state.showVisual)

    return {
      ...state,
      board,
      flagsPlaced: 0,
      isPlaying: false,
      isDead: false,
      isWinner: false,
      face: Faces.Blank,
      timer: 0,
      visualSteps
    }
  }
  // handle if not started yet, create board then reveal changes
  if (!state.isPlaying) {

    const { board, visualSteps } = generateBoard(state.rows, state.columns, state.showVisual)

    let bombsLeft = state.numberOfBombs;
    const possibleBombLocations = board.map(el => el.id).filter(id => id !== action.cellIndex);

    // fisher-yates random shuffling algorithm
    for (let i = possibleBombLocations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = possibleBombLocations[i]
      possibleBombLocations[i] = possibleBombLocations[j]
      possibleBombLocations[j] = temp

      if (state.showVisual) {
        visualSteps.push({
          baseIntervalTimeMs: 10,
          cells: possibleBombLocations.slice(possibleBombLocations.length - state.numberOfBombs, possibleBombLocations.length).map((bombLocation) => ({
            cellIndex: bombLocation,
            color: '#FF6666'
          })),
          changeType: ChangeType.ShuffleBombs
        })
      }
    }

    while (bombsLeft > 0) {
      const randomBombLocation = possibleBombLocations.pop() as number;
      newBoard[randomBombLocation] = {
        ...newBoard[randomBombLocation],
        isBomb: true
      }
      bombsLeft--;
    }

    // calculate how many bombs each cell is surrounded by
    for (let i = 0; i < newBoard.length; i++) {
      const newCell = { ...newBoard[i] };
      let numberOfBombs = 0;

      const cells: VisualCellInformation[] = [];

      if (state.showVisual) {
        cells.push({
          cellIndex: i,
          color: '#00aeff'
        })
      }

      for (let j = 0; j < newCell.neighbors.length; j++) {
        const neighborIndex = newCell.neighbors[j];
        const neighborIsBomb = newBoard[neighborIndex].isBomb
        if (neighborIsBomb) numberOfBombs++;

        if (state.showVisual) {
          cells.push({
            cellIndex: neighborIndex,
            color: neighborIsBomb ? '#FF6666' : '#3CB371'
          })
        }
      }

      if (state.showVisual) {
        visualSteps.push({
          baseIntervalTimeMs: 50,
          cells,
          changeType: ChangeType.CalculateNeighborBombs
        })
      }

      newCell.neighborBombs = numberOfBombs;
      newBoard[i] = newCell;
    }

    const boardWithCellsRevealed = revealCells(action.cellIndex, newBoard, state.autoReveal, state.autoFlag, state.autoPlay, state.showVisual);
    if (state.showVisual) {
      visualSteps.push(...boardWithCellsRevealed.visualSteps);
    }

    if (visualSteps) {
      return {
        ...state,
        visualSteps
      }
    }

    return {
      ...state,
      board: boardWithCellsRevealed.board,
      flagsPlaced: 0,
      isPlaying: boardWithCellsRevealed.hasWon ? false : true,
      isDead: boardWithCellsRevealed.hasLost,
      isWinner: boardWithCellsRevealed.hasWon,
      face: boardWithCellsRevealed.hasWon ? Faces.Celebration : Faces.Happy,
      timer: 0,
      visualSteps
    }
  }

  const boardWithCellsRevealed = revealCells(action.cellIndex, newBoard, state.autoReveal, state.autoFlag, state.autoPlay, state.showVisual);

  return {
    ...state,
    board: boardWithCellsRevealed.board,
    isPlaying: !boardWithCellsRevealed.hasLost && !boardWithCellsRevealed.hasWon,
    isDead: boardWithCellsRevealed.hasLost,
    isWinner: boardWithCellsRevealed.hasWon,
    face: boardWithCellsRevealed.hasLost ? Faces.Dizzy : boardWithCellsRevealed.hasWon ? Faces.Celebration : Faces.Happy,
  }
}