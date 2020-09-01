import React from 'react'
import { FaAlignRight } from 'react-icons/fa'
import PageLinks from './constants/Links'

interface NavbarProps {
  toggleSidebar: () => void
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <button type="button" className="toggle-btn" aria-label="open sidebar">
            <FaAlignRight onClick={toggleSidebar} />
          </button>
        </div>
        <PageLinks styleClass="nav-links" />
      </div>
    </nav>
  )
}

export default Navbar
