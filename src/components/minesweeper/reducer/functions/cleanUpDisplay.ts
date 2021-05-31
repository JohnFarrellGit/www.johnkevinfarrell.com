import { State } from "..";

export const cleanUpDisplay = (state: State) => {

  const board = [...state.board];

  for (let i = 0; i < board.length; i++) {
    board[i].visualCellOptions = undefined;
  }

  return {
    ...state,
    board,
    visualSteps: []
  }
}