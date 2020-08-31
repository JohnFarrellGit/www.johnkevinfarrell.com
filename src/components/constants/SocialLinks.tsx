import React from 'react'
import { FaGithubSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa'

const data = [
  {
    id: 1,
    icon: <FaGithubSquare className="social-icon" />,
    url: 'https://www.github.com/JohnFarrellDev/'
  },
  {
    id: 2,
    icon: <FaLinkedin className="social-icon" />,
    url: 'https://linkedin.com/in/johnfarrelldev'
  },
  {
    id: 3,
    icon: <FaTwitterSquare className="social-icon" />,
    url: 'https://twitter.com/JohnFar55526330'
  }
]
const links = data.map(link => {
  return (
    <li key={link.id}>
      <a href={link.url} className="social-link">
        {link.icon}
      </a>
    </li>
  )
})

interface SocialLinksProps {
  styleClass?: string
}

const SocialLinks = ({ styleClass }: SocialLinksProps) => {
  return <ul className={`social-links ${styleClass || ''}`}>{links}</ul>
}

export default SocialLinks
