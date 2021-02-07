import { State } from "../.."
import { generateBoard } from "../../../functions"
import { Faces } from "../../../types"

export const resetGame = (state: State) => {
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