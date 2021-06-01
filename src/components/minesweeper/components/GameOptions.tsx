import React, { useState } from 'react'
import styled from 'styled-components'
import { MinesweeperCustomSettings } from '../../../common/hooks/useLocalStorage'
import { mapDifficultyToGameBoard } from '../constants'
import { GameDifficulty } from '../types'
import { FiChevronsDown, FiChevronsUp } from 'react-icons/fi'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

interface GameOptionsI {
  isPlaying: boolean;
  difficulty: GameDifficulty;
  rows: number;
  columns: number;
  numberOfBombs: number;
  updateDifficulty: (gameDifficulty: GameDifficulty, rows?: number, columns?: number, numberOfBombs?: number) => void;
  customSettings: MinesweeperCustomSettings;
  switchAutoReveal: () => void;
  autoReveal: boolean;
  switchAutoFlag: () => void;
  autoFlag: boolean;
  switchAutoPlay: () => void;
  autoPlay: boolean;
  switchAdvancedAutoPlay: () => void;
  advancedAutoPlay: boolean;
  switchVisualize: () => void;
  visualize: boolean;
  switchEdgeless: () => void;
  edgelessMode: boolean;
}

export const GameOptions = ({
  isPlaying,
  difficulty,
  rows,
  columns,
  numberOfBombs,
  updateDifficulty,
  switchAutoReveal,
  autoReveal,
  switchAutoFlag,
  autoFlag,
  switchAutoPlay,
  autoPlay,
  switchAdvancedAutoPlay,
  advancedAutoPlay,
  visualize,
  switchVisualize,
  edgelessMode,
  switchEdgeless
}: GameOptionsI) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleDifficultyChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'Beginner') {
      updateDifficulty(GameDifficulty.Beginner);
    } else if (event.target.value === 'Intermediate') {
      updateDifficulty(GameDifficulty.Intermediate);
    } else if (event.target.value === 'Expert') {
      updateDifficulty(GameDifficulty.Expert);
    }
  })

  const handleClickAutoReveal = () => {
    if (isPlaying) return;
    switchAutoReveal();
  }

  const handleClickAutoFlag = () => {
    if (isPlaying) return;
    switchAutoFlag();
  }

  const handleClickAutoPlay = () => {
    if (isPlaying) return;
    switchAutoPlay();
  }

  const handleClickAdvancedAutoPlay = () => {
    if (isPlaying) return;
    switchAdvancedAutoPlay();
  }

  const handleClickVisualize = () => {
    if (isPlaying) return;
    switchVisualize();
  }

  const handleClickEdgeless = () => {
    if (isPlaying) return;
    switchEdgeless();
  }

  return (
    <>
      <GameConfiguration>
        <div onClick={() => setIsOpen(!isOpen)}>
          <p>Game Configuration {isOpen ? <FiChevronsUp /> : <FiChevronsDown />}</p>
        </div>
        {
          isOpen ?
            <OptionsContainer>
              <OptionItem>
                <label htmlFor="difficulty">Difficulty</label>
                <select
                  value={mapDifficultyToGameBoard[difficulty].display}
                  onChange={handleDifficultyChange}
                  disabled={isPlaying}
                  name="difficulty"
                  id="difficulty"
                >
                  <option value={"Beginner"}>Beginner</option>
                  <option value={"Intermediate"}>Intermediate</option>
                  <option value={"Expert"}>Expert</option>
                </select>
              </OptionItem>
              <OptionItem>
                <label htmlFor="rows">Rows</label>
                <input
                  type="number"
                  value={rows}
                  disabled={true}
                  name="rows"
                  id="rows"
                />
              </OptionItem>
              <OptionItem>
                <label htmlFor="columns">Columns</label>
                <input
                  type="number"
                  value={columns}
                  disabled={true}
                  name="columns"
                  id="columns"
                />
              </OptionItem>
              <OptionItem>
                <label htmlFor="bombs">Bombs</label>
                <input
                  type="number"
                  value={numberOfBombs}
                  disabled={true}
                  name="bombs"
                  id="bombs"
                />
              </OptionItem>
              <OptionItem>
                <label htmlFor="auto-reveal">Auto Reveal</label>
                <CheckBox onClick={handleClickAutoReveal} id="auto-flag">
                  {autoReveal ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                </CheckBox>
              </OptionItem>
              <OptionItem>
                <label htmlFor="auto-flag">Auto Flag</label>
                <CheckBox onClick={handleClickAutoFlag} >
                  {autoFlag ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                </CheckBox>
              </OptionItem>
              <OptionItem>
                <label htmlFor="auto-play">Auto Play</label>
                <CheckBox onClick={handleClickAutoPlay} >
                  {autoPlay ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                </CheckBox>
              </OptionItem>
              <OptionItem>
                <label htmlFor="advanced-auto-play">Auto Play++</label>
                <CheckBox onClick={handleClickAdvancedAutoPlay} >
                  {advancedAutoPlay ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                </CheckBox>
              </OptionItem>
              <OptionItem>
                <label htmlFor="visualize">Visualizer</label>
                <CheckBox onClick={handleClickVisualize} >
                  {visualize ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                </CheckBox>
              </OptionItem>
              <OptionItem>
                <label htmlFor="edgeless">Edgeless Mode</label>
                <CheckBox onClick={handleClickEdgeless} >
                  {edgelessMode ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                </CheckBox>
              </OptionItem>
            </OptionsContainer>
            : null
        }
      </GameConfiguration>
    </>
  )
}

const CheckBox = styled.div`
  margin: 0 auto;
  font-size: 1.45em;
  color: black;
`

const GameConfiguration = styled.div`
  justify-content: center;
  border-bottom: 2px solid #777;
  background-color: #BDBDBD;
  width: 100%;
  cursor: pointer;
  text-align: center;
  p {
    color: black;
    font-size: 1.25em;
    user-select: none;
    margin: 0 auto;
  }
`

const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0px 0px 5px 0px;
`

const OptionItem = styled.div`
  label {
    color: black;
    font-size: 1.25em;
    user-select: none;
  }
  input {
    width: 90px;
    font-size: 1.25em;
    height: 1.75em;
  }
  select {
    font-size: 1em;
    height: 2em;
  }
  height: 70px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  vertical-align: center;
  text-align: center;
`
