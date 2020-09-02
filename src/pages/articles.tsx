import React from 'react'
import Layout from '../components/Layout'
import ArticlesComponent from '../components/Articles'
import SEO from '../components/SEO'

const ArticlesPage = () => {
  return (
    <Layout>
      <SEO title="Articles" description="Articles (mostly about software engineering) written by John Farrell" />
      <section className="blog-page">
        <ArticlesComponent />
      </section>
    </Layout>
  )
}
export default ArticlesPage
