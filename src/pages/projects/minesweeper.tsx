import React from 'react'
import { MinesweeperWLocalStorage } from '../../components/minesweeper/MinesweeperWLocalStorage';
// TODO:

// should no longer create columns, rows etc by default, need to get from difficulty programmatically, is a bug when we load from saved difficulty!
// rows, columns have to be optional (only when making from custom!), we also no longer pass a board but return one!

// bug when first click also wins game (if 1 bomb exists in custom for example)

// bug when hydrate our local storage to display, flicker but also wrong number of columns

// responsive design (cell size, game size etc, flag and bomb size) - can our cell size and other responsive change based on number of columns
// https://engageinteractive.co.uk/blog/em-vs-rem-vs-px
// we can flex column the options and status (instead of hiding status), we could also set a max columns of 25 * screenwidth?

// resolve issue of shifting game options as width grows

// give instructions for the game and how to play

// keyboard controls + accessibility

// improve folder structure
// original sounds, useSound(), Josh W Comeau
// game to always be completable, no 50/50 problem (try and solve first, if not possible recreate?)
// implement a hinter function

// make text non selectable for game options
// cell size needs to be slightly bigger, will impact responsive design and bomb/flag size

// performance improvements (memorisation of components etc.) stop timer update updating everything

// connect site/projects page to strapi

// BUGS

// fix custom difficulty - doesn't seem to be working(?)
// fixing custom stuff (especially when very low or high bomb count, seems broken with neighbors)
// bug when changing to expert, click top left, is rows and columns mixed up??

const minesweeper = () => {
  return (
    <MinesweeperWLocalStorage />
  )
}

export default minesweeper
