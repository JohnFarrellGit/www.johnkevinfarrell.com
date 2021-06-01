import { State } from "..";

export const advancedAutoPlay = (state: State) => {
  return {
    ...state,
    advancedAutoPlay: !state.advancedAutoPlay
  }
}