import React from 'react'
import Layout from '../components/Layout'
import ArticlesComponent from '../components/Articles'

const ArticlesPage = () => {
  return (
    <Layout>
      <section className="blog-page">
        <ArticlesComponent />
      </section>
    </Layout>
  )
}
export default ArticlesPage
