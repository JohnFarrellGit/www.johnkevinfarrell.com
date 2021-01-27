import { State } from "..";

export const placeFlag = (state: State, action: { type: 'PlaceFlag', cellIndex: number }) => {
  if (state.board && !state.board[action.cellIndex].isCovered || !state.isPlaying) {
    return {
      ...state
    };
  };

  const newBoard = [...state.board!];
  const newCell = { ...newBoard[action.cellIndex] };
  newCell.isFlagged = !newBoard[action.cellIndex].isFlagged;
  newBoard[action.cellIndex] = newCell;
  return {
    ...state,
    flagsPlaced: state.flagsPlaced + (newCell.isFlagged ? 1 : -1),
    board: newBoard
  };
};
