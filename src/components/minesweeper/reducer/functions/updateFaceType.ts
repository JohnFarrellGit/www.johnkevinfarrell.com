import { State } from "..";
import { FaceType } from "../../types";

export const updateFaceType = (state: State) => {
  if (state.faceType === FaceType.Regular) {
    return {
      ...state,
      faceType: FaceType.Cat,
    }
  } else {
    return {
      ...state,
      faceType: FaceType.Regular,
    }
  }
}