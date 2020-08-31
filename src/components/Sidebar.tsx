import React from 'react'
import { FaTimes } from 'react-icons/fa'
import Links from './constants/Links'
import SocialLinks from './constants/SocialLinks'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <aside className={`sidebar ${isOpen ? 'show-sidebar' : ''}`}>
      <button type="button" className="close-btn" onClick={toggleSidebar}>
        <FaTimes />
      </button>
      <div className="side-container">
        <Links styleClass={`${isOpen ? 'sidebar-links' : ''}`} />
        <SocialLinks styleClass={`${isOpen ? 'sidebar-icons' : ''}`} />
      </div>
    </aside>
  )
}

export default Sidebar
