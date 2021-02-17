import React from 'react'
import { ChangeType } from '../types'

interface VisualizerInformationI {
  changeType: ChangeType
}

const mapChangeTypeToText = {
  [ChangeType.GenerateBoard]: 'Generating Board',
  [ChangeType.GenerateNeighbors]: 'Calculating Neighbor Cell Positions',
  [ChangeType.ShuffleBombs]: 'Shuffling Bomb Locations',
  [ChangeType.CalculateNeighborBombs]: 'Calculate Number of Bombs in Neighbor Cells',
  [ChangeType.RevealClickedCell]: 'Revealing Clicked Cell',
  [ChangeType.RevealClickedCellAndNeighbors]: 'Revealing Clicked Cell and recursively surrounding cells if 0 bombs present',
  [ChangeType.LookForCellsToFlag]: 'Looking for bombs to flag',
  [ChangeType.LookForCellsToReveal]: 'Looking for cells to reveal'
}

export const VisualizerInformation = ({ changeType }: VisualizerInformationI) => {
  return (
    <div>
      {mapChangeTypeToText[changeType] || 'placeholder'}
    </div>
  )
}
