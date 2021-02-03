import { FluidObject } from 'gatsby-image'
import React from 'react'
import Project from './Project'
import Title from './Title'

export interface ProjectI {
  projects: {
    node: {
      description: {
        description: string;
      },
      github: string;
      id: string;
      slug: string;
      title: string;
      published: string,
      projectImage: {
        fluid: FluidObject;
        ariaLabel: string;
      }
    }
  }[]
  totalCount: number;
}

const Projects = ({ projects }: ProjectI) => {
  return (
    <section className="section projects">
      <Title title="Projects" />
      <div className="section-center projects-center">
        {projects.map((project, index) => {
          return <Project
            key={project.node.id}
            index={index}
            description={project.node.description.description}
            title={project.node.title}
            github={project.node.github}
            slug={project.node.slug}
            projectImage={project.node.projectImage.fluid}
            ariaLabel={project.node.projectImage.ariaLabel}
          />
        })}
      </div>
    </section>
  )
}

export default Projects
