import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import styled from 'styled-components';
import useInterval from '../../common/hooks/useInterval';

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

const ConwaysGameOfLife = () => {

  const [columns, setColumns] = useState(50);
  const [rows, setRows] = useState(30);
  const [grid, setGrid] = useState<boolean[][]>(Array(columns).fill(Array(rows).fill(false)));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setGrid(Array(rows).fill(Array(columns).fill(false)))
  }, [rows, columns])

  const flipFunction = (column: number, row: number) => {
    const gridCopy = JSON.parse(JSON.stringify(grid)) as boolean[][];
    gridCopy[column][row] = !gridCopy[column][row];
    setGrid(gridCopy);
  }

  const playGame = useInterval(() => {
    if (!isPlaying) {
      return;
    }

    const gridCopy = JSON.parse(JSON.stringify(grid)) as boolean[][];

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

  }, 500);


  useEffect(() => {
    playGame
  }, [isPlaying])

  return (
    <Layout>
      <SEO title="Game of Life by John Conway" description="Simple implementation of John Conway's game of life" />
      <main>
        <GameContainer>
          <button onClick={() => setIsPlaying(currPlayValue => !currPlayValue)}>{isPlaying ? 'Stop' : 'Start'}</button>
          <GridContainer>
            {
              grid.map((columns, indexC) => columns.map((_, indexR) => {
                return (
                  <Cell key={`col - ${indexC} : row - ${indexR}`} alive={grid[indexC][indexR]} onClick={() => flipFunction(indexC, indexR)} />
                )
              }))
            }
          </GridContainer>
        </GameContainer>
      </main>
    </Layout>
  )
}

export default ConwaysGameOfLife;

const GameContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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
  background-color: ${(props: CellI) => props.alive ? 'pink' : 'white'}
`
