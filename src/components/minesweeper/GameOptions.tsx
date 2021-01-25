import React from 'react'
import styled from 'styled-components'
import { GameDifficulty } from './reducer'

interface BoardConfiguration {
  numberOfRows: number;
  numberOfColumns: number;
  numberOfBombs: number;
  display: string;
}

interface GameOptionsI {
  isPlaying: boolean;
  difficulty: GameDifficulty;
  rows: number;
  columns: number;
  numberOfBombs: number;
  updateDifficulty: (gameDifficulty: GameDifficulty, rows?: number, columns?: number, numberOfBombs?: number) => void;
}

export const GameOptions = ({ isPlaying, difficulty, rows, columns, numberOfBombs, updateDifficulty }: GameOptionsI) => {

  const mapDifficultyToGameBoard: Record<GameDifficulty, BoardConfiguration> = {
    [GameDifficulty.Beginner]: {
      numberOfRows: 10,
      numberOfColumns: 10,
      numberOfBombs: 10,
      display: 'Beginner'
    },
    [GameDifficulty.Intermediate]: {
      numberOfRows: 15,
      numberOfColumns: 15,
      numberOfBombs: 40,
      display: 'Intermediate'
    },
    [GameDifficulty.Expert]: {
      numberOfRows: 16,
      numberOfColumns: 30,
      numberOfBombs: 1,
      display: 'Expert'
    }
    // [GameDifficulty.Custom]: {
    //   numberOfRows: 1,
    //   numberOfColumns: 1,
    //   numberOfBombs: 1,
    //   display: 'Custom'
    // }
  }

  const handleDifficultyChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    // if (event.target.value === 'Custom') {
    //   setDifficulty(GameDifficulty.Custom);
    // } else

    if (event.target.value === 'Beginner') {
      updateDifficulty(GameDifficulty.Beginner);
    } else if (event.target.value === 'Intermediate') {
      updateDifficulty(GameDifficulty.Intermediate);
    } else if (event.target.value === 'Expert') {
      updateDifficulty(GameDifficulty.Expert);
    }
  })

  const changeRows = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value < 1 || value > 99) return;
    updateDifficulty(GameDifficulty.Custom, value, columns, numberOfBombs);
  }

  const changeColumns = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value < 1 || value > 99) return;
    updateDifficulty(GameDifficulty.Custom, rows, value, numberOfBombs);
  }

  const changeBombs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value < 1 || value > rows * columns - 1) return;
    updateDifficulty(GameDifficulty.Custom, rows, columns, value);
  }

  return (
    <Container>
      <OptionItem>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          value={mapDifficultyToGameBoard[difficulty].display}
          onChange={handleDifficultyChange}
          disabled={isPlaying}
          style={{ display: 'block' }}
          name="difficulty"
          id="difficulty"
        >
          <option value={"Beginner"}>Beginner</option>
          <option value={"Intermediate"}>Intermediate</option>
          <option value={"Expert"}>Expert</option>
          {/* <option value={"Custom"}>Custom</option> */}
        </select>
      </OptionItem>
      <OptionItem>
        <label htmlFor="rows">Rows:</label>
        <input
          type="number"
          min={1}
          max={100}
          value={rows}
          disabled={isPlaying}
          style={{ display: 'block' }}
          onChange={changeRows}
          name="rows"
          id="rows"
        />
      </OptionItem>
      <OptionItem>
        <label htmlFor="columns">Columns:</label>
        <input
          type="number"
          min={1}
          max={100}
          value={columns}
          disabled={isPlaying} // || difficulty !== GameDifficulty.Custom
          style={{ display: 'block' }}
          onChange={changeColumns}
          name="columns"
          id="columns"
        />
      </OptionItem>
      <OptionItem>
        <label htmlFor="bombs">Bombs:</label>
        <input
          type="number"
          min={1}
          max={(rows * columns) - 1}
          value={numberOfBombs}
          disabled={isPlaying}
          style={{ display: 'block' }}
          onChange={changeBombs}
          name="bombs"
          id="bombs"
        />
      </OptionItem>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #777;
  background-color: #BDBDBD;
  padding: 5px 0px;
`

const OptionItem = styled.div`
  label {
    color: black;
  }
  input {
    width: 100px;
    @media(max-width: 500px) {
      width: 80px;
    }
    @media(max-width: 500px) {
      width: 60px;
    }
  }
`
