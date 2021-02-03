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
      }
    }
  }[]
  totalCount: number;
}

const Projects = ({ totalCount, projects }: ProjectI) => {
  console.log("🚀 ~ file: Projects.tsx ~ line 26 ~ Projects ~ projects", projects)
  console.log("🚀 ~ file: Projects.tsx ~ line 16 ~ Projects ~ projects", totalCount)
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
          />
        })}
      </div>
    </section>
  )
}

export default Projects
