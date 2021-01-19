import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaPlay, FaStopCircle } from 'react-icons/fa'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import useInterval from '../../common/hooks/useInterval'

// add ability to go back and forward through steps (capture the last step, can do this in stepback function)
// bug, end of a row overlaps into row below due to 1d array
// can only go back if already played, can always go forward, just call gameTick
// add slider for setting rows and columns
// slider for speed
// make display responsive
// change colours
// drag to highlight cells to turn on or off(?)

const ConwaysGameOfLife = () => {
  const [columns] = useState(50)
  const [rows] = useState(30)
  const [grid, setGrid] = useState<boolean[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [steps, setSteps] = useState(0)
  const [history, setHistory] = useState<boolean[][]>([])
  const [highlightNeighbors, setHighlightNeighbors] = useState(false)

  useEffect(() => {
    setGrid(Array(columns * rows).fill(false))
  }, [rows, columns])

  const countNeighbors = (cellNumber: number) => {
    const neighborCoords: [number, number][] = [
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, 0],
      [1, -1]
    ]
    let count = 0

    const gridN = []

    for (let i = 0; i < neighborCoords.length; i++) {
      const [x, y] = neighborCoords[i]
      gridN.push(cellNumber + x + y * 50)
    }

    for (let i = 0; i < gridN.length; i++) {
      if (grid[gridN[i]]) count++
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

  const gameTick = () => {
    if (!isPlaying) {
      return
    }

    // if (steps === 0) {
    //   addToHistory();
    // }

    const gridCopy = [...grid]

    grid.forEach((_, cellIndex) => {
      const isAlive = grid[cellIndex]
      const aliveNeighbors = countNeighbors(cellIndex)

      if (isAlive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
        gridCopy[cellIndex] = false
      } else if (!isAlive && aliveNeighbors === 3) {
        gridCopy[cellIndex] = true
      }
    })

    setGrid(gridCopy)
    // addToHistory();
  }

  useInterval(gameTick, 1000)

  const stepForward = () => {
    if (steps < history.length) {
      setGrid(history[steps + 1])
      setSteps(steps + 1)
    }
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
  }

  const random = () => {
    const randomGrid: boolean[] = []
    for (let i = 0; i < columns * rows; i++) {
      const randomChoice = Math.random() > 0.9
      randomGrid.push(randomChoice)
    }
    setGrid(randomGrid)
  }

  const showNeighborsHighlight = () => {
    setHighlightNeighbors(!highlightNeighbors)
  }

  return (
    <Layout>
      <SEO title="Game of Life by John Conway" description="Simple implementation of John Conway's game of life" />
      <Main>
        <p style={{ textAlign: 'center' }}>John Conway's Game of Life</p>
        <GameContainer>
          <div>
            <Controls>
              <button onClick={() => setIsPlaying(currPlayValue => !currPlayValue)} type="button">
                {isPlaying ? <FaStopCircle /> : <FaPlay />}
              </button>
              <button onClick={stepBackward} type="button">
                Back a Step
              </button>
              <button onClick={stepForward} type="button">
                Forward a Step
              </button>
              <button onClick={clear} type="button">
                Clear
              </button>
              <button onClick={random} type="button">
                Random
              </button>
              {/* <button onClick={showNeighborsSwitch} type="button">{showNeighbors ? 'remove neighbors' : 'show neighbors'}</button> */}
              <button onClick={showNeighborsHighlight} type="button">
                {highlightNeighbors ? 'stop highlighting' : 'highlight neighbors'}
              </button>
            </Controls>
            <GridContainer>
              {grid.map((_, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Cell key={index} alive={grid[index]} onClick={() => flipFunction(index)}>
                    {/* {index} */}
                    {countNeighbors(index)}
                    {/* {`${indexR} ${indexC}`} */}
                    {/* {showNeighbors ? neighbors[indexR][indexC] : null} */}
                  </Cell>
                )
              })}
            </GridContainer>
          </div>
        </GameContainer>
      </Main>
    </Layout>
  )
}

export default ConwaysGameOfLife

const GameContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(50, 20px);
`

interface CellI {
  alive: boolean
}

const Cell = styled.div`
  width: 20px;
  height: 20px;
  border: solid 1px black;
  background-color: ${(props: CellI) => (props.alive ? '#24DC5B' : 'white')};
`

const Main = styled.main`
  margin-bottom: 20px;
`
