export const generateNeighbors = (cellNumber: number, columns: number): number[] => {
  const neighborCoordsLeft: [number, number][] = [
    [-1, 1],
    [-1, 0],
    [-1, -1]
  ];
  const neighborCoordsMiddle: [number, number][] = [
    [0, 1],
    [0, -1]
  ];
  const neighborCoordsRight: [number, number][] = [
    [1, 1],
    [1, 0],
    [1, -1]
  ];

  const gridN = [];

  if (cellNumber % columns !== 0) {
    for (let i = 0; i < neighborCoordsLeft.length; i++) {
      const [x, y] = neighborCoordsLeft[i];
      gridN.push(cellNumber + x + y * columns);
    }
  }
  for (let i = 0; i < neighborCoordsMiddle.length; i++) {
    const [x, y] = neighborCoordsMiddle[i];
    gridN.push(cellNumber + x + y * columns);
  }
  if ((cellNumber + 1) % columns !== 0) {
    for (let i = 0; i < neighborCoordsRight.length; i++) {
      const [x, y] = neighborCoordsRight[i];
      gridN.push(cellNumber + x + y * columns);
    }
  }
  return gridN;
};
