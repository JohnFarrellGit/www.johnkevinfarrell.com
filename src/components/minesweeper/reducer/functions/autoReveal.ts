import { State } from "..";

export const autoReveal = (state: State) => {

  return {
    ...state,
    autoReveal: !state.autoReveal
  };
};
