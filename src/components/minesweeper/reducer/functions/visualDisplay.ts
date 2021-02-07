import { State } from "..";
import { VisualOption } from "../../types";

export const visualDisplay = (state: State, action: { visualSteps: VisualOption[] }) => {

  const [newVisual, ...remainingVisualSteps] = action.visualSteps;
  console.log("🚀 ~ file: visualDisplay.ts ~ line 7 ~ visualDisplay ~ newVisual", newVisual)

  // so loop over board, remove old visual choice
  // apply new visual choice
  // return new board
  // return new visual steps with 0th item removed

  const newBoard = newVisual?.board !== undefined ? [...newVisual.board] : [...state.board];

  for (let i = 0; i < newBoard.length; i++) {
    newBoard[i].visualCellOptions = undefined;
  }

  for (let i = 0; i < newVisual?.cells.length; i++) {
    const cellIndex = newVisual.cells[i].cellIndex;
    newBoard[cellIndex].visualCellOptions = {
      color: newVisual.cells[i].color
    }
  }

  // we should pass the new board everytime we make the visual change, then when visual display steps is length of 0 we can actually update the board to what it is

  return {
    ...state,
    board: newBoard,
    visualSteps: remainingVisualSteps
  }
}