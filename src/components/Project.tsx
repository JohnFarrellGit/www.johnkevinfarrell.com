import React from 'react'
import Image, { FluidObject } from 'gatsby-image'
import { FaGithubSquare, FaShareSquare } from 'react-icons/fa'
import { Link } from 'gatsby'

interface ProjectProps {
  description: string
  title: string
  github: string
  slug: string
  projectImage: FluidObject;
  ariaLabel: string;
  index: number
}

const Project = ({ description, title, github, slug, projectImage, ariaLabel, index }: ProjectProps) => {
  return (
    <Link to={slug}>
      <article className="project">
        <Image fluid={projectImage} className="project-img" alt={ariaLabel} />
        <div className="project-info">
          <span className="project-number">0{index + 1}.</span>
          <h3>{title}</h3>
          <p className="project-desc">{description}</p>
          <div className="project-links">
            <a href={github}>
              <FaGithubSquare className="project-icon" />
            </a>
            <Link to={slug}>
              <FaShareSquare className="project-icon" />
            </Link>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default Project
