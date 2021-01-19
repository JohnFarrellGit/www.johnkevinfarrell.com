import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FaPlay, FaStopCircle } from 'react-icons/fa'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import useInterval from '../../common/hooks/useInterval'

// TODOs

// add a canvas mode
// drag to highlight cells to turn on or off(?)
// https://www.w3schools.com/jsref/event_onmouseenter.asp
// ability to select certain patterns to place
// more efficient algorithms for computing??

// add ability to go back and forward through steps (capture the last step, can do this in stepback function)
// can only go back if already played, can always go forward, just call gameTick
// add slider for setting rows and columns
// slider for speed
// make display responsive


// resource section

// http://golly.sourceforge.net/
// https://www.youtube.com/watch?v=W1zKu3fDQR8
// https://en.wikipedia.org/wiki/Rule_30
// https://www.youtube.com/watch?v=VguG_y05Xe8
// https://www.youtube.com/watch?v=ez773teNFYA
// http://dotat.at/prog/life/life.html
// https://pmav.eu/stuff/javascript-game-of-life-v3.1.1/
// https://www.wolframscience.com/nks/
// https://www.youtube.com/watch?v=_eC14GonZnU
// https://conwaylife.com/wiki/LifeWiki:Game_of_Life_Status_page
// https://mathworld.wolfram.com/ElementaryCellularAutomaton.html

// Cell interface, track if this Cell just got created for colour tracking

// data visualization for pi day

// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
enum Shapes {
  Cell,
  Block,
  Beehive,
  Loaf,
  Boat,
  Tub,
  Blinker1,
  Blinker2,
  Toad1,
  Toad2,
  Beacon,
  Pulsar1,
  Pulsar2,
  Pulsar3,
  Pentadecathlon,
  Glider1,
  Glider2,
  Glider3,
  Cat
}

const mapShapesToGrid = {
  [Shapes.Cell]: [1],
  [Shapes.Block]: [1, 1, 2, 1, 1]
}

mapShapesToGrid[Shapes.Cell]

// 0 blank
// 1 is fill in
// 2 is new line

const generateNeighbors = (cellNumber: number, columns: number): number[] => {
  const neighborCoordsLeft: [number, number][] = [
    [-1, 1],
    [-1, 0],
    [-1, -1]
  ]
  const neighborCoordsMiddle: [number, number][] = [
    [0, 1],
    [0, -1]
  ]
  const neighborCoordsRight: [number, number][] = [
    [1, 1],
    [1, 0],
    [1, -1]
  ]

  const gridN = []

  if (cellNumber % columns !== 0) {
    for (let i = 0; i < neighborCoordsLeft.length; i++) {
      const [x, y] = neighborCoordsLeft[i]
      gridN.push(cellNumber + x + y * columns)
    }
  }
  for (let i = 0; i < neighborCoordsMiddle.length; i++) {
    const [x, y] = neighborCoordsMiddle[i]
    gridN.push(cellNumber + x + y * columns)
  }
  if ((cellNumber + 1) % columns !== 0) {
    for (let i = 0; i < neighborCoordsRight.length; i++) {
      const [x, y] = neighborCoordsRight[i]
      gridN.push(cellNumber + x + y * columns)
    }
  }

  return gridN;
}

const ConwaysGameOfLife = () => {
  const [columns] = useState(50)
  const [rows] = useState(35)
  const [grid, setGrid] = useState<boolean[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [steps, setSteps] = useState(0)
  const [history, setHistory] = useState<boolean[][]>([])
  const [speed, setSpeed] = useState(5);
  const [shapeSelected, setShapeSelected] = useState(Shapes.Cell)
  const [neighborsMap, setNeighborsMap] = useState<number[][]>([])
  const [isCanvasMode, setIsCanvasMode] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setGrid(Array(columns * rows).fill(false))
  }, [rows, columns])

  useEffect(() => {
    const neighborsMap: number[][] = []
    for (let i = 0; i < columns * rows; i++) {
      neighborsMap.push(generateNeighbors(i, columns));
    }
    setNeighborsMap(neighborsMap)
  }, [rows, columns])

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.getContext('2d');
    }
  })

  const countNeighbors = (cellNumber: number) => {
    const neighbors = neighborsMap[cellNumber];
    let count = 0;
    for (let i = 0; i < neighbors.length; i++) {
      if (grid[neighbors[i]]) count++
    }
    return count
  }

  const flipFunction = (cellNumber: number) => {
    const gridCopy = [...grid]
    gridCopy[cellNumber] = !gridCopy[cellNumber]
    setGrid(gridCopy)
  }

  const addToHistory = () => {
    const gridCopy = [...grid]
    const historyCopy = JSON.parse(JSON.stringify(history)) as boolean[][]
    historyCopy.push(gridCopy)
    setHistory(historyCopy)
    setSteps(steps + 1)
  }

  const compareGridsForEquality = (arr1: boolean[], arr2: boolean[]) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  const gameTick = () => {
    // addToHistory();

    const gridCopy = [...grid]

    grid.forEach((_, cellIndex) => {
      const isAlive = grid[cellIndex]
      const aliveNeighbors = countNeighbors(cellIndex)

      if (isAlive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
        gridCopy[cellIndex] = false
      }
      if (!isAlive && aliveNeighbors === 3) {
        gridCopy[cellIndex] = true
      }
    })

    if (!compareGridsForEquality(grid, gridCopy)) {
      setSteps(steps + 1)
    }

    setGrid(gridCopy)
    // addToHistory();
  }

  const playGameOfLife = () => {
    if (isPlaying) {
      gameTick();
    }
  }

  useInterval(playGameOfLife, 1000 / speed)

  const stepForward = () => {
    gameTick();
  }

  const stepBackward = () => {
    if (steps <= 0) {
      return
    }
    setGrid(history[steps - 1])
    setSteps(steps - 1)
  }

  const clear = () => {
    setGrid(Array(rows * columns).fill(false))
    setSteps(0)
  }

  const random = () => {
    const randomGrid: boolean[] = []
    for (let i = 0; i < columns * rows; i++) {
      const randomChoice = Math.random() > 0.9
      randomGrid.push(randomChoice)
    }
    setGrid(randomGrid)
    setSteps(0)
  }

  const updateSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(event.target.value))
  }

  return (
    <Layout>
      <SEO title="Game of Life by John Conway" description="Simple implementation of John Conway's game of life" />
      <Main>
        <p style={{ textAlign: 'center' }}>John Conway's Game of Life</p>
        <GameContainer>
          <ControlGameSplitter>
            <Controls>
              <button onClick={() => setIsPlaying(currPlayValue => !currPlayValue)} type="button">
                {isPlaying ? <FaStopCircle /> : <FaPlay />}
              </button>
              <button onClick={stepBackward} type="button">
                Back a Step
              </button>
              {/* <button onClick={stepForward} type="button">
                Forward a Step
              </button> */}
              <button onClick={clear} type="button">
                Clear
              </button>
              <button onClick={random} type="button">
                Random
              </button>
              Speed
              <input type="range" min="1" max="10" step="1" value={speed} onChange={updateSpeed} />
              {`Steps Played ${steps}`}
            </Controls>
            <FlexCenter>
              {
                isCanvasMode ?
                  <Canvas ref={canvasRef} />
                  :
                  <GridContainer numberOfColumns={columns}>
                    {/* {grid.map((_, index) => <Cell key={index} alive={grid[index]} onClick={() => flipFunction(index)} />)} */}
                  </GridContainer>
              }
            </FlexCenter>

          </ControlGameSplitter>
        </GameContainer>
        <div>
          <p>Explanation goes here</p>
        </div>
      </Main>
    </Layout>
  )
}

export default ConwaysGameOfLife

const Canvas = styled.canvas`
  width: 75%;
  border: 1px solid red;
`

const GameContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`

const ControlGameSplitter = styled.div`
  width: 100%;
`

const FlexCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
`

interface GridContainerI {
  numberOfColumns: number;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props: GridContainerI) => `repeat(${props.numberOfColumns}, 20px)`};
`

interface CellI {
  alive: boolean
}

const Cell = styled.div`
  width: 20px;
  height: 20px;
  /* border: solid 1px black; */
  background-color: ${(props: CellI) => (props.alive ? '#24DC5B' : 'white')};
  display: flex;
  justify-content: center;
  cursor: pointer;
`

const Neighbor = styled.p`
  color: black;
  display: flex;
  line-height: 20px;
  cursor: pointer;
`

const Main = styled.main`
  margin-bottom: 20px;
`
