import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Jobs from '../components/Jobs'

export default () => {
  return (
    <Layout>
      <SEO title="JohnFarrellDev" description="Home page for John Farrell Dev website" />
      <Hero />
      <Skills />
      <Jobs />
    </Layout>
  )
}
