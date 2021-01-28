export const generateNeighbors = (cellNumber: number, columns: number, rows: number): number[] => {

  const hasAbove = cellNumber >= columns;
  const hasBelow = cellNumber < (columns * rows) - columns;
  const hasLeft = cellNumber % columns !== 0;
  const hasRight = (cellNumber + 1) % columns !== 0;

  const neighborCoords: [number, number][] = [];

  if (hasLeft) {
    if (hasAbove) neighborCoords.push([-1, -1])
    neighborCoords.push([-1, 0])
    if (hasBelow) neighborCoords.push([-1, 1])
  }
  if (hasRight) {
    if (hasAbove) neighborCoords.push([1, -1])
    neighborCoords.push([1, 0])
    if (hasBelow) neighborCoords.push([1, 1])
  }

  if (hasAbove) neighborCoords.push([0, -1])
  if (hasBelow) neighborCoords.push([0, 1])

  const gridN = [];

  for (let i = 0; i < neighborCoords.length; i++) {
    const [x, y] = neighborCoords[i];
    gridN.push(cellNumber + x + y * columns);
  }

  return gridN;
};
