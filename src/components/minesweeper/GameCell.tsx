import React, { useCallback } from 'react'
import styled from 'styled-components'

interface GameCellI {
  isCovered: boolean;
  isBomb: boolean;
  isFlagged: boolean;
  neighborBombs: number;
  id: number;
  leftClick: (cellIndex: number) => void;
  holdCell: (cellIndex: number) => void;
  rightClick: (cellIndex: number) => void;
}

export const GameCell = ({ isCovered, isBomb, isFlagged, neighborBombs, id, leftClick, holdCell, rightClick }: GameCellI) => {

  const leftClickCell = useCallback(() => {
    leftClick(id);
  }, []);

  const mouseDownCell = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // event.button === 0 occurs on left click
    if (event.button === 0) {
      if (isCovered) {
        holdCell(id)
      }
    }
  }, []);

  const rightClickCell = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    if (isCovered) {
      rightClick(id);
    }
  }, [])

  return (
    <CellContainer
      isCovered={isCovered}
      neighborBombs={neighborBombs}
      isBomb={isBomb}
      onClick={leftClickCell}
      onMouseDown={mouseDownCell}
      onContextMenu={rightClickCell}
    >
      {isCovered && isFlagged && "🚩"}
      {!isCovered && isBomb && "💣"}
      {!isCovered && !isBomb && neighborBombs !== 0 && neighborBombs}
    </CellContainer>
  )
}

interface CellContainerI {
  isCovered: boolean;
  neighborBombs: number;
  isBomb: boolean;
}

const CellContainer = styled.div`
  box-sizing: border-box;
  width: 20px;
  height: 20px;

  border-top: ${(props: CellContainerI) => (props.isCovered ? '2px solid white' : '1px solid #7B7B7B')};
  border-right: ${(props: CellContainerI) => (props.isCovered ? '2px solid #7B7B7B' : '1px solid #7B7B7B')};
  border-left: ${(props: CellContainerI) => (props.isCovered ? '2px solid white' : '1px solid #7B7B7B')};
  border-bottom: ${(props: CellContainerI) => (props.isCovered ? '2px solid 7B7B7B' : '1px solid #7B7B7B')};

  color: ${(props: CellContainerI) => (
    props.neighborBombs === 1 ? 'blue' :
      props.neighborBombs === 2 ? 'green' :
        props.neighborBombs === 3 ? 'red' :
          props.neighborBombs === 4 ? '#575793' :
            props.neighborBombs === 5 ? 'yellow' :
              props.neighborBombs === 6 ? 'white' :
                props.neighborBombs === 7 ? 'black' : 'brown'
  )};

  background-color: ${(props: CellContainerI) => (props.isCovered ? '#BDBDBD' : '#C2C2C2')};
  display: flex;
  justify-content: center;
  cursor: pointer;
  line-height: 20px;

  :hover {
    background-color: ${(props: CellContainerI) => (props.isCovered ? '#5C5C5C' : '#BDBDBD')};
  }
`
