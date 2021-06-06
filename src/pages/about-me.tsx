import React from 'react'
import Layout from '../components/Layout'
import Title from '../components/Title'
import SEO from '../components/SEO'

const info =
  "Hi, I'm John Farrell a professional software developer. I started this programming journey in 2016 teaching myself a little bit of " +
  'Python following the completion of my BSc in Biomedical Science. It became my ambition to become a software engineer so I enrolled ' +
  'in a masters degree in Computer Science at the University of Kent. After graduating I worked at Tata Consultancy Services ' +
  'where I had the opportunity to be involved in a large scale cloud industrilisation project. I then became interested in web ' +
  'development and joined CACI IIG where I have worked since developing web applications for our customers.'

const stack = [
  {
    id: 1,
    title: 'JavaScript'
  },
  {
    id: 2,
    title: 'TypeScript'
  },
  {
    id: 3,
    title: 'React'
  },
  {
    id: 4,
    title: 'Node'
  },
  {
    id: 5,
    title: 'Java'
  },
  {
    id: 6,
    title: 'Spring'
  },
  {
    id: 7,
    title: 'C#'
  },
  {
    id: 8,
    title: 'ASP.net'
  }
]

const About = () => {

  return (
    <Layout>
      <SEO title="About Me" description="Information about John Farrell" />
      <section className="about-page">
        <div className="section-center about-center">
          <article className="about-text">
            <Title title="About Me" />
            <p>{info}</p>
            <div className="about-stack">
              {stack.map(item => {
                return <span key={item.id}>{item.title}</span>
              })}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  )
}

export default About
