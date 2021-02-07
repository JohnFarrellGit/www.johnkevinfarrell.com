import { State } from "../..";
import { Cell, ChangeType, VisualOption } from "../../../types";

export const placeBombs = (state: State, board: Cell[], action: { type: 'ClickCell', cellIndex: number }) => {
  const visualSteps: VisualOption[] = []
  const possibleBombLocations = board.map(el => el.id).filter(id => id !== action.cellIndex);
  let bombsLeft = state.numberOfBombs;

  // fisher-yates random shuffling algorithm
  for (let i = possibleBombLocations.length; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = possibleBombLocations[i]
    possibleBombLocations[i] = possibleBombLocations[j]
    possibleBombLocations[j] = temp

    if (state.showVisual) {
      if ((i >= possibleBombLocations.length - 1 - state.numberOfBombs) || (j >= possibleBombLocations.length - 1 - state.numberOfBombs)) {
        visualSteps.push({
          baseIntervalTimeMs: 300,
          cells: possibleBombLocations.slice(-bombsLeft).map((bombLocation) => ({
            cellIndex: bombLocation,
            color: '#FF6666'
          })),
          changeType: ChangeType.ShuffleBombs
        })
      }
    }
  }

  while (bombsLeft > 0) {
    const randomBombLocation = possibleBombLocations.pop() as number;
    board[randomBombLocation] = {
      ...board[randomBombLocation],
      isBomb: true
    }
    bombsLeft--;
  }

  return {
    board,
    visualSteps
  }
}