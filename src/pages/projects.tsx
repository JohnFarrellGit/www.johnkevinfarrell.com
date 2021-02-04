import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import React from 'react'
import Layout from '../components/Layout'
import Projects from '../components/Projects'
import SEO from '../components/SEO'

const ProjectsPage = ({ data: { allContentfulProject: { projects } } }: {
  data: {
    allContentfulProject: {
      totalCount: number;
      projects: {
        node: {
          description: {
            description: string;
          },
          github: string;
          id: string;
          slug: string;
          title: string;
          projectImage: {
            fluid: FluidObject;
            alt: string;
          },
          tags: string[];
        }
      }[]
    }
  }
}) => {
  return (
    <Layout>
      <SEO title="Projects" description="Software engineering projects created by John Farrell" />
      <section className="projects-page">
        <Projects projects={projects} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulProject {
      projects: edges {
        node {
          description {
            description
          }
          github
          id
          slug
          title
          projectImage {
            fluid {
              srcSetWebp
            }
            alt: description
          }
          tags
        }
      }
    }
  }
`

export default ProjectsPage
