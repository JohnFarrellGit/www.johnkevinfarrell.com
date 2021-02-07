import { State } from "..";

export const switchShowVisual = (state: State) => {
  return {
    ...state,
    showVisual: !state.showVisual
  }
}