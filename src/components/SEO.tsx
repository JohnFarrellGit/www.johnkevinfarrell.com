import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import favicon from '../static/favicon.ico'

const query = graphql`
  {
    site {
      siteMetadata {
        author {
          name
          url
          email
        }
        siteDescription: description
        image
        siteUrl
        siteTitle: title
        twitterUsername
      }
    }
  }
`

interface SEOProps {
  title: string
  description: string
}

const SEO = ({ title, description }: SEOProps) => {
  console.log('favicon', favicon)

  const { site } = useStaticQuery(query)

  const { siteDescription, siteTitle, siteUrl, image, twitterUsername } = site.siteMetadata

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en'
      }}
      title={`${title} | ${siteTitle}`}
    >
      <meta name="description" content={description || siteDescription} />
      <meta name="image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      <link rel="apple-touch-icon" sizes="180x180" href={favicon} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  )
}

export default SEO
