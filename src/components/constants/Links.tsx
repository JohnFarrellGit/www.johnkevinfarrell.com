import React from 'react'
import { Link } from 'gatsby'

const data = [
  {
    id: 1,
    text: 'home',
    url: '/'
  },
  {
    id: 2,
    text: 'about',
    url: '/about-me/'
  },
  {
    id: 3,
    text: 'projects',
    url: '/projects/'
  },
  {
    id: 4,
    text: 'articles',
    url: '/articles/'
  },
  {
    id: 5,
    text: 'contact',
    url: '/contact/'
  }
]

const tempLinks = data.map(link => {
  return (
    <li key={link.id}>
      <Link to={link.url}>{link.text}</Link>
    </li>
  )
})

interface LinksProps {
  styleClass?: string
}

const Links = ({ styleClass }: LinksProps) => {
  return <ul className={`page-links ${styleClass || ''}`}>{tempLinks}</ul>
}

export default Links
