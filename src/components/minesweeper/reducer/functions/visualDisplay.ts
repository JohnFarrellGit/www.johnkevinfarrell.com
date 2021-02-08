import { State } from "..";
import { VisualOption } from "../../types";

export const visualDisplay = (state: State, action: { visualSteps: VisualOption[] }) => {

  const [newVisual, ...remainingVisualSteps] = action.visualSteps;

  const board = [...state.board];

  for (let i = 0; i < board.length; i++) {
    board[i].visualCellOptions = undefined;
  }

  if (newVisual && newVisual.cells.length > 0) {
    for (let i = 0; i < newVisual.cells.length; i++) {
      const cellIndex = newVisual.cells[i].cellIndex;
      board[cellIndex].visualCellOptions = {
        color: newVisual.cells[i].color
      }
      if (newVisual.cells[i].uncover) {
        board[cellIndex].isCovered = false;
      }
      board[cellIndex].neighborBombs = newVisual.cells[i].neighborBombs;
    }
  }

  return {
    ...state,
    board,
    visualSteps: remainingVisualSteps
  }
}