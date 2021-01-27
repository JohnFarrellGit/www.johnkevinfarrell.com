import { State } from ".."
import { Faces } from "../../types"

export const holdCell = (state: State, action: { type: 'HoldCell', cellIndex: number }) => {
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