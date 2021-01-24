import styled from '@emotion/styled'
import React from 'react'
import { Faces } from '../../pages/projects/minesweeper'

interface GameStatusI {
  bombsLeft: number;
  totalBombs: number;
  face: Faces;
  timePlayed: number;
}

export const GameStatus = ({ bombsLeft, totalBombs, face, timePlayed }: GameStatusI) => {
  return (
    <Container>
      <Bombs><Text>💣 {bombsLeft} / {totalBombs}</Text></Bombs>
      <FaceDisplay><Text>{face}</Text></FaceDisplay>
      <Timer><Text>⏱️ {timePlayed.toString().padStart(3, '0')}</Text></Timer>
    </Container>
  )
}

const Container = styled.div`
  background-color: #BDBDBD;
  height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #777;
`

const Bombs = styled.div`
  height: 50px;
  font-size: 2em;
  width: 33%;
  padding-left: 10px;
  p {
    float: left;
  }
`

const Timer = styled.div`
  color: black;
  font-size: 2em;
  width: 33%;
  padding-right: 10px;
  p {
    float: right;
  }
`

const FaceDisplay = styled.div`
  font-size: 2em;
  cursor: pointer;
  width: 33%;
`

const Text = styled.p`
  text-align: center;
  color: black;
`
