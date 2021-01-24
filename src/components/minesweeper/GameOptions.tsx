import React, { useState } from 'react'
import styled from 'styled-components'
import { GameDifficulty, mapDifficultyToGameBoard } from '../../pages/projects/minesweeper'

// allow user to update board size, numberOfBombs (easy, medium, custom)

interface GameOptionsI {
  isPlaying: boolean;
  updateDifficulty: (numberOfRows: number, numberOfColumns: number, numberOfBombs: number) => void;
}

export const GameOptions = ({ isPlaying, updateDifficulty }: GameOptionsI) => {

  const [difficulty, setDifficulty] = useState(GameDifficulty.Intermediate);
  const [rows, setRows] = useState(15);
  const [columns, setColumns] = useState(15);
  const [numberOfBombs, setNumberOfBombs] = useState(40);

  const handleDifficultyChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'Custom') {
      setDifficulty(GameDifficulty.Custom);
      updateDifficulty(10, 10, 10)
    } else {
      if (event.target.value === 'Beginner') {
        setDifficulty(GameDifficulty.Beginner);
        updateDifficulty(10, 10, 10);
      } else if (event.target.value === 'Intermediate') {
        setDifficulty(GameDifficulty.Intermediate);
        updateDifficulty(15, 15, 40);
      } else if (event.target.value === 'Expert') {
        setDifficulty(GameDifficulty.Expert);
        updateDifficulty(16, 30, 99);
      }
    }
  })



  return (
    <Container>
      <div>
        Difficulty:
        <select
          value={mapDifficultyToGameBoard[difficulty].display}
          onChange={handleDifficultyChange}
          disabled={isPlaying}
          style={{ display: 'block' }}
        >
          <option value={"Beginner"}>Beginner</option>
          <option value={"Intermediate"}>Intermediate</option>
          <option value={"Expert"}>Expert</option>
          <option value={"Custom"}>Custom</option>
        </select>
      </div>
      <div>
        Rows:
        <input
          type="number"
          min={1}
          max={100}
          value={rows}
          disabled={isPlaying}
          style={{ display: 'block' }}
        />
      </div>
      <div>
        Columns:
        <input
          type="number"
          min={1}
          max={100}
          value={columns}
          disabled={isPlaying}
          style={{ display: 'block' }}
        />
      </div>
      <div>
        Bombs:
        <input
          type="number"
          min={1}
          max={(rows * columns) - 1}
          value={numberOfBombs}
          disabled={isPlaying}
          style={{ display: 'block' }}
        />
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-bottom: 2px solid #777;
  background-color: #BDBDBD;
`
