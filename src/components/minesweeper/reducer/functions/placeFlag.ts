import { State } from "..";

export const placeFlag = (state: State, action: { type: 'PlaceFlag', cellIndex: number }) => {

  if (!state.board[action.cellIndex].isCovered || !state.isPlaying) {
    return {
      ...state
    };
  };

  const newBoard = [...state.board];
  newBoard[action.cellIndex].isFlagged = !newBoard[action.cellIndex].isFlagged;

  return {
    ...state,
    board: newBoard,
  };
};
