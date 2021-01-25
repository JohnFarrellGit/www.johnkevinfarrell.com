import styled from '@emotion/styled'
import React, { useState } from 'react'
import { keyframes } from 'styled-components'
import { Faces, FaceType } from './reducer'

interface GameStatusI {
  bombsLeft: number;
  totalBombs: number;
  faceType: FaceType;
  face: Faces;
  timePlayed: number;
  rightClickFace: () => void
}

export const GameStatus = ({ bombsLeft, totalBombs, faceType, face, timePlayed, rightClickFace }: GameStatusI) => {

  const mapRegularFaces = {
    [Faces.Shock]: '😮',
    [Faces.Blank]: '😶',
    [Faces.Happy]: '🙂',
    [Faces.Dizzy]: '😵',
    [Faces.Celebration]: '🥳',
    [Faces.Wacky]: '🤪'
  }

  const mapCatFaces = {
    [Faces.Shock]: '🙀',
    [Faces.Blank]: '🐱',
    [Faces.Happy]: '😺',
    [Faces.Dizzy]: '😾',
    [Faces.Celebration]: '😸',
    [Faces.Wacky]: '😹'
  }

  const [spinningFace, setSpinningFace] = useState(false);

  const displayFace = faceType === FaceType.Regular ? mapRegularFaces[face] : mapCatFaces[face];
  const displayFaceSpinning = faceType === FaceType.Regular ? '🤪' : '😹';

  const rightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    rightClickFace();
  }

  const leftClick = () => {
    setSpinningFace(true);
    setTimeout(() => {
      setSpinningFace(false);
    }, 2000)
  }

  return (
    <Container>
      <Bombs><Text>💣 {bombsLeft} / {totalBombs}</Text></Bombs>
      <FaceDisplay
        onClick={leftClick}
        onContextMenu={rightClick}
        spinningFace={spinningFace}
      >
        {!spinningFace ? <Text>{displayFace}</Text> : <Text>{displayFaceSpinning}</Text>}
      </FaceDisplay>
      <Timer><Text>⏱️ {timePlayed.toString().padStart(3, '0')}</Text></Timer>
    </Container>
  )
}

const Container = styled.div`
  background-color: #BDBDBD;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #777;
  * p {
    line-height: normal;
    vertical-align: middle;
    margin: 2px 0px 2px 0px;
  }
  @media (max-width: 450px) {
    display: none;
  }
`

const Bombs = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  p {
    float: left;
  }
`

const Timer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  color: black;
  padding-right: 10px;
`

interface FaceDisplayI {
  spinningFace: boolean;
}

const FaceDisplay = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  cursor: pointer;
  p {
    transform: ${(props: FaceDisplayI) => props.spinningFace ? `rotate(360deg)` : `rotate(0deg)`};
  }
`

const Text = styled.p`
  text-align: center;
  transition-duration: 4s;
  transition-property: transform;
  color: black;
  user-select: none;
  font-size: 2em;
  @media (max-width: 550px) {
    font-size: 1.75em;
  }
  @media (max-width: 450px) {
    font-size: 1.5em;
  }
`


// const Rotate = styled.div`
//   animation: ${rotate} 2s ease infinite;
// `;
