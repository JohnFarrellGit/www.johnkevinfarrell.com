import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Jobs from '../components/Jobs'
import { graphql } from 'gatsby'

export default ({ data: { allContentfulTechnicalSkills: { edges } } }: {
  data: {
    allContentfulTechnicalSkills: {
      edges: {
        nodes: {
          childContentfulTechnicalSkillsSkillsJsonNode: {
            skills: {
              id: string;
              name: string;
              description: string;
              link?: string;
            }
          }
        }
      }[]
    }
  }
}) => {
  return (
    <Layout>
      <SEO description="Home page for John Farrell, John Farrell is a professional software engineer with expertise in web development." />
      <Hero />
      <Skills />
      <Jobs />
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulTechnicalSkills {
      edges {
        node {
          childContentfulTechnicalSkillsSkillsJsonNode {
            skills {
              description
              id
              link
              name
            }
          }
        }
      }
    }
  }
`
