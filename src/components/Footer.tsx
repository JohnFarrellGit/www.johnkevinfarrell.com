import React from 'react'
import SocialLinks from './constants/SocialLinks'

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <SocialLinks styleClass="footer-links" />
        <h4>
          copyright&copy;2020-{new Date().getFullYear()}
          <span>WebDev</span> all rights reserved
        </h4>
      </div>
    </footer>
  )
}

export default Footer
