import React from 'react'
import { MinesweeperWLocalStorage } from '../../components/minesweeper/MinesweeperWLocalStorage';

// TODO:

// test none or dodgy local storage values!

// responsive design (cell size, game size etc, flag and bomb size) - can our cell size and other responsive change based on number of columns
// https://engageinteractive.co.uk/blog/em-vs-rem-vs-px
// we can flex column the options and status (instead of hiding status), we could also set a max columns of 25 * screenwidth?
// make expert tall instead of wide (same for custom I guess)

// resolve issue of shifting game options as width grows

// give instructions for the game and how to play

// ability to auto flag, ability to auto reveal

// original sounds, useSound(), Josh W Comeau
// game to always be completable, no 50/50 problem (try and solve first, if not possible recreate?)
// implement a hinter function

// performance improvements (memorisation of components etc.) stop timer update updating everything

// connect site/projects page to strapi

// BUGS

// sometimes changing rows or columns then making game leaves us with a malformed board, are rows and columns being passed incorrectly somewhere?
// recreate, go to custom, set numberOfRows low, then set it high and then reveal cells

// fix custom difficulty - doesn't seem to be working(?)
// fixing custom stuff (especially when very low or high bomb count, seems broken with neighbors)
// bug when changing to expert, click top left, is rows and columns mixed up??

const minesweeper = () => {
  return (
    <MinesweeperWLocalStorage />
  )
}

export default minesweeper
