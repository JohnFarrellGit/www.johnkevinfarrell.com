import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import styled from 'styled-components';
import useInterval from '../../common/hooks/useInterval';
import { FaPlay, FaStopCircle } from 'react-icons/fa';

const neighbourCoords: [number, number][] = [
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, 0],
  [1, -1]
]

// add ability to go back and forward through steps (capture the last step, can do this in stepback function)
// can only go back if already played, can always go forward, just call gameTick
// add slider for setting rows and columns
// slider for speed
// make display responsive
// change colours
// drag to highlight cells to turn on or off(?)

const ConwaysGameOfLife = () => {

  const [columns, setColumns] = useState(50);
  const [rows, setRows] = useState(30);
  const [grid, setGrid] = useState<boolean[][]>(Array(columns).fill(Array(rows).fill(false)));
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState(0);
  const [history, setHistory] = useState<boolean[][][]>([])

  useEffect(() => {
    setGrid(Array(rows).fill(Array(columns).fill(false)))
  }, [rows, columns])

  const flipFunction = (column: number, row: number) => {
    const gridCopy = JSON.parse(JSON.stringify(grid)) as boolean[][];
    gridCopy[column][row] = !gridCopy[column][row];
    setGrid(gridCopy);
  }

  const addToHistory = () => {
    const gridCopy = JSON.parse(JSON.stringify(grid)) as boolean[][];
    const historyCopy = JSON.parse(JSON.stringify(history)) as boolean[][][];
    historyCopy.push(gridCopy)
    setHistory(historyCopy);
    setSteps(steps + 1);
  }

  const gametick = () => {
    if (!isPlaying) {
      return;
    }

    if (steps === 0) {
      addToHistory();
    }

    const gridCopy = [...grid]
    grid.forEach((columns, indexC) => columns.forEach((_, indexR) => {
      const isAlive = grid[indexC][indexR];
      let neighboursAlive = 0;
      for (let i = 0; i < neighbourCoords.length; i++) {
        const [x, y] = neighbourCoords[i];
        if (grid[indexC + x]?.[indexR + y]) {
          neighboursAlive++;
        }
      }
      if (isAlive && ((neighboursAlive < 2) || (neighboursAlive > 3))) {
        gridCopy[indexC][indexR] = false;
      } else if (!isAlive && neighboursAlive === 3) {
        gridCopy[indexC][indexR] = true;
      }
    }))

    setGrid(gridCopy);
    addToHistory();
  }

  useInterval(gametick, 1000);

  const stepForward = () => {
    if (steps >= history.length) {
      return;
    } else {
      console.log(history[steps + 1])
      setGrid(history[steps + 1]);
      setSteps(steps + 1);
    }
  }

  const stepBackward = () => {
    console.log(steps);
    if (steps <= 0) {
      return;
    }
    setGrid(history[steps - 1]);
    setSteps(steps - 1);
  }

  const clear = () => {
    setGrid(Array(50).fill(Array(30).fill(false)));
  }

  const random = () => {
    const grid = new Array(50).fill(Array(30).fill(false));

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const randomFlip = Math.random() > 0.8;
        grid[i][j] = randomFlip;
      }
    }
    setGrid(grid);
  }

  return (
    <Layout>
      <SEO title="Game of Life by John Conway" description="Simple implementation of John Conway's game of life" />
      <Main>
        <p style={{ textAlign: 'center' }}>John Conway's Game of Life</p>
        <GameContainer>
          <div>
            <Controls>
              <button onClick={() => setIsPlaying(currPlayValue => !currPlayValue)}>{isPlaying ? <FaStopCircle /> : <FaPlay />}</button>
              <button onClick={stepBackward}>Back a Step</button>
              <button onClick={stepForward}>Forward a Step</button>
              <button onClick={clear}>Clear</button>
              <button onClick={random}>Random</button>
            </Controls>
            <GridContainer>
              {
                grid.map((columns, indexC) => columns.map((_, indexR) => {
                  return (
                    <Cell key={`col - ${indexC} : row - ${indexR}`} alive={grid[indexC][indexR]} onClick={() => flipFunction(indexC, indexR)} />
                  )
                }))
              }
            </GridContainer>
          </div>
        </GameContainer>
      </Main>
    </Layout>
  )
}

export default ConwaysGameOfLife;

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
  grid-template-columns: repeat(50, 20px)
`

interface CellI {
  alive: boolean
}

const Cell = styled.div`
  width: 20px;
  height: 20px;
  border: solid 1px black;
  background-color: ${(props: CellI) => props.alive ? '#24DC5B' : 'white'}
`

const Main = styled.main`
  margin-bottom: 20px;
`
