import { State } from "..";

export const switchEdgelessMode = (state: State) => {
  return {
    ...state,
    edgelessMode: !state.edgelessMode
  }
}