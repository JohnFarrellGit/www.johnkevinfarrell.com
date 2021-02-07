import { State } from "../.."
import { Faces } from "../../../types"

export const checkValidClick = (state: State, action: { type: 'ClickCell', cellIndex: number }) => {
  if (state.isPlaying && (!state.board[action.cellIndex].isCovered || state.board[action.cellIndex].isFlagged)) {
    return {
      validClick: false,
      gameState: {
        ...state,
        face: Faces.Happy
      }
    }
  }
  return {
    validClick: true,
    gameState: {
      ...state
    }
  }
}