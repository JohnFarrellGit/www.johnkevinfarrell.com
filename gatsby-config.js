module.exports = {
  siteMetadata: {
    title: 'John Farrell | Professional Software Engineer | Web Developer',
    description: "John Farrell's website for sharing of software projects and articles.",
    keywords: 'gatsbyjs, gatsby, javascript, John Farrell, software developer, software engineer, code, web development',
    siteUrl: 'https://www.JohnFarrell.dev',
    author: {
      name: 'John Farrell',
      url: 'hhttps://www.JohnFarrell.dev',
      email: 'JohnFarrell@fastmail.com'
    },
    image: '/favicon.png',
    twitterUsername: 'JohnFarrellDev'
  },
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          `gatsby-plugin-sitemap`,
          `gatsby-plugin-robots-txt`,
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.johnfarrell.dev/'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        }
      }
    }
  ]
}
