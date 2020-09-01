import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

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
  const { site } = useStaticQuery(query)

  const { siteDescription, siteTitle, siteUrl, image, twitterUsername } = site.siteMetadata

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en'
      }}
      title={`${title} | ${siteTitle}`}
      link={[{ rel: 'shortcut icon', type: 'image/png', href: '/favicon.ico' }]}
    >
      <meta name="description" content={description || siteDescription} />
      <meta name="image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
    </Helmet>
  )
}

export default SEO
