import { State } from "..";

export const updateTimer = (state: State) => {
  if (state.isPlaying) {
    return {
      ...state,
      timer: state.timer + 1
    };
  }
  return {
    ...state
  };
};
