import { State } from "..";

export const visualize = (state: State) => {
  return {
    ...state,
    visualize: !state.visualize
  }
}