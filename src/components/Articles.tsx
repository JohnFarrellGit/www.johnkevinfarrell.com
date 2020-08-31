import React from 'react'
import Title from './Title'

const Articles = () => {
  return (
    <section className="section">
      <Title title="Articles (coming soon)" />
      <div className="section-center blogs-center">
        {/* {blogs.map(blog => {
          return <Blog key={blog.id} {...blog} />
        })} */}
      </div>
    </section>
  )
}

export default Articles
