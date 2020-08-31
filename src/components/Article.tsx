import React from 'react'
// import Image from 'gatsby-image'
import { Link } from 'gatsby'

interface ArticleProps {
  date: string
  slug: string
  title: string
  category: string
  desc: string
  id: string
  image: string
}

const Article = ({ date, slug, title, category, desc, id, image }: ArticleProps) => {
  return (
    <Link to={`/blogs/${slug}`} key={id} className="blog">
      <article>
        {/* <Image fluid={image.childImageSharp.fluid} className="blog-img" /> */}
        <div className="blog-card">
          <h4>{title}</h4>
          <p>{desc}</p>
          <div className="blog-footer">
            <p>{category}</p>
            <p>{date}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default Article
