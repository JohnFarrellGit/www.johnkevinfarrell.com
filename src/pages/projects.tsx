import React from 'react'
import Layout from '../components/Layout'
import Projects from '../components/Projects'
import SEO from '../components/SEO'

const ProjectsPage = () => {
  return (
    <Layout>
      <SEO title="Projects" description="Software engineering projects created by John Farrell" />
      <section className="projects-page">
        <Projects />
      </section>
    </Layout>
  )
}

export default ProjectsPage
