import React from 'react'
import { MinesweeperWLocalStorage } from '../../components/minesweeper/MinesweeperWLocalStorage';

// TODO:

// responsive design (cell size, game size etc, flag and bomb size) - can our cell size and other responsive change based on number of columns
// https://engageinteractive.co.uk/blog/em-vs-rem-vs-px
// also look into grid for game options
// we can flex column the options and status (instead of hiding status), we could also set a max columns of 25 * screenwidth?
// make expert tall instead of wide (same for custom I guess)

// laggy as we hold down up or down on custom settings, maybe if we make neighbors after click it will be faster? (plus debounce the input change)

// resolve issue of shifting game options as width grows

// give instructions for the game and how to play

// ability to auto flag, ability to auto reveal (if on no best times!)

// auto reveal click first cell, then click cells we know can't be bombs, if in guess situation we can click a cell we are 100% sure isn't a bomb that we are not already touching
// basically means we have a 100% guess when it is a not game enforced 50/50!

// original sounds, useSound(), Josh W Comeau
// game to always be completable, no 50/50 problem (try and solve first, if not possible recreate?)
// implement a hinter function

// performance improvements (memorisation of components etc.) stop timer update updating everything

// connect site/projects page to strapi
// https://strapi.io/documentation/developer-docs/latest/deployment/heroku.html
// https://duckduckgo.com/?t=ffab&q=cloudinary

const minesweeper = () => {
  return (
    <MinesweeperWLocalStorage />
  )
}

export default minesweeper
