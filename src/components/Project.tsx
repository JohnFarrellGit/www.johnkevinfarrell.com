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
  index: number;
  tags: string[];
}

const Project = ({ description, title, github, slug, projectImage, ariaLabel, index, tags }: ProjectProps) => {
  return (
    <Link to={slug} aria-label={`link to project ${title}`}>
      <article className="project">
        <Image fluid={projectImage} className="project-img" alt={ariaLabel} />
        <div className="project-info">
          <span className="project-number">0{index + 1}.</span>
          <h3>{title}</h3>
          <p className="project-desc">{description}</p>
          <div className="project-stack">
            {
              tags.map((tagItem, index) => {
                return (
                  <span key={index}>{tagItem}</span>
                )
              })
            }
          </div>
          <div className="project-links">
            <a href={github} >
              <FaGithubSquare className="project-icon" aria-label="link to project code on github" />
            </a>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default Project
