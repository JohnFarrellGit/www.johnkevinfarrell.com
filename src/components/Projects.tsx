import React from 'react'
import Title from './Title'

const Projects = () => {
  return (
    <section className="section projects">
      <Title title="Projects (coming soon)" />
      <div className="section-center projects-center">
        {/* {projects.map((project, index) => {
          return <Project key={project.id} index={index} {...project} />
        })} */}
      </div>
    </section>
  )
}

export default Projects
