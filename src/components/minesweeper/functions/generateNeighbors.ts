export const generateNeighbors = (cellNumber: number, columns: number, rows: number, edgelessMode: boolean): number[] => {

  const hasAbove = cellNumber >= columns;
  const hasBelow = cellNumber < (columns * rows) - columns;
  const hasLeft = cellNumber % columns !== 0;
  const hasRight = (cellNumber + 1) % columns !== 0;

  const neighborCoords: [number, number][] = [];

  const gridN = [];
  if (!edgelessMode) {
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

    for (let i = 0; i < neighborCoords.length; i++) {
      const [x, y] = neighborCoords[i];
      gridN.push(cellNumber + x + y * columns);
    }
  } else {
    if (hasLeft) {
      if (hasAbove) {
        neighborCoords.push([-1, -1])
      } else {
        neighborCoords.push([-1, (rows - 1)])
      }
      if (hasBelow) {
        neighborCoords.push([-1, 1])
      } else {
        neighborCoords.push([-1, -(rows - 1)])
      }
      neighborCoords.push([-1, 0])
    } else {
      if (hasAbove) {
        neighborCoords.push([(columns - 1), -1])
      } else {
        neighborCoords.push([(columns - 1), (rows - 1)])
      }
      if (hasBelow) {
        neighborCoords.push([(columns - 1), 1])
      } else {
        neighborCoords.push([(columns - 1), -(rows - 1)])
      }
      neighborCoords.push([(columns - 1), 0])
    }

    if (hasRight) {
      if (hasAbove) {
        neighborCoords.push([1, -1]);
      } else {
        neighborCoords.push([1, (rows - 1)]);
      }
      if (hasBelow) {
        neighborCoords.push([1, 1]);
      } else {
        neighborCoords.push([1, -(rows - 1)]);
      }
      neighborCoords.push([1, 0])
    } else {
      if (hasAbove) {
        neighborCoords.push([-(columns - 1), -1]);
      } else {
        neighborCoords.push([-(columns - 1), (rows - 1)]);
      }
      if (hasBelow) {
        neighborCoords.push([-(columns - 1), 1]);
      } else {
        neighborCoords.push([-(columns - 1), -(rows - 1)]);
      }
      neighborCoords.push([-(columns - 1), 0])
    }

    if (hasAbove) {
      neighborCoords.push([0, -1]);
    } else {
      neighborCoords.push([0, (rows - 1)]);
    }

    if (hasBelow) {
      neighborCoords.push([0, 1]);
    } else {
      neighborCoords.push([0, -(rows - 1)]);
    }

    for (let i = 0; i < neighborCoords.length; i++) {
      const [x, y] = neighborCoords[i];
      gridN.push(cellNumber + x + (y * columns));
    }
  }

  return gridN;
};
