import { State } from "..";

export const autoFlag = (state: State) => {
  return {
    ...state,
    autoFlag: !state.autoFlag
  }
}