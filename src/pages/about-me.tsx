import React from 'react'
import Layout from '../components/Layout'
import Title from '../components/Title'
import SEO from '../components/SEO'
import { graphql } from 'gatsby'
import Image, { FluidObject } from 'gatsby-image'

const About = ({ data: { allContentfulAboutMe: { edges } } }: {
  data: {
    allContentfulAboutMe: {
      edges: {
        node: {
          photo: {
            fluid: FluidObject;
            description: string;
          },
          technicalSkills: string[],
          description: {
            description: string;
          }
        }
      }[]
    }
  }
}) => {

  const aboutMeData = edges[0];

  return (
    <Layout>
      <SEO title="About Me" description="Information about John Farrell" />
      <section className="about-page">
        <div className="section-center about-center">
          <Image fluid={aboutMeData.node.photo.fluid} className="about-img" alt={aboutMeData.node.photo.description} />
          <article className="about-text">
            <Title title="About Me" />
            <p>{aboutMeData.node.description.description}</p>
            <div className="about-stack">
              {aboutMeData.node.technicalSkills.map((skill, index) => {
                return <span key={index}>{skill}</span>
              })}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulAboutMe {
      edges {
        node {
          technicalSkills
          description {
            description
          }
          photo {
            fluid {
              srcSetWebp
            }
            description
          }
        }
      }
    }
  }
`

export default About
