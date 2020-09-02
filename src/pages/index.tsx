import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Jobs from '../components/Jobs'

export default () => {
  return (
    <Layout>
      <SEO description="Home page for John Farrell, John Farrell is a professional software engineer with expertise in web development." />
      <Hero />
      <Skills />
      <Jobs />
    </Layout>
  )
}
