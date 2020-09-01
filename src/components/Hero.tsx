import React from 'react'
import { Link } from 'gatsby'
import SocialLinks from './constants/SocialLinks'
import Robot from '../assets/flying-robot.svg'

const Hero = () => {
  return (
    <header className="hero">
      <div className="section-center hero-center">
        <article className="hero-info">
          <div>
            <div className="underline" />
            <h1>Hello, I'm John</h1>
            <h2>I'm a software developer with a focus on the web</h2>
            <Link to="/contact" className="btn">
              Contact Me
            </Link>
            <SocialLinks />
          </div>
        </article>
        <Robot className="hero-img" />
      </div>
    </header>
  )
}

export default Hero
