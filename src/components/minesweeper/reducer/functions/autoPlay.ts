import { State } from "..";

export const autoPlay = (state: State) => {
  return {
    ...state,
    autoPlay: !state.autoPlay
  }
}