import React from 'react'
import SocialLinks from './constants/SocialLinks'

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <SocialLinks styleClass="footer-links" />
        <p>
          copyright&copy;2020-{new Date().getFullYear()}
          <span>John Farrell</span> all rights reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
