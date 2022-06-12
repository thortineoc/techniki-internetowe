import React from 'react'
import './TopMenu.scss'
import { Link } from 'react-router-dom'

function TopMenu() {
  return (
    <div className="TopMenu">
      <Link to="/favourites" className="TopMenu-item">
        My favourites
      </Link>
      <Link to="/added" className="TopMenu-item">
        Added by me
      </Link>
      <Link to="/all" className="TopMenu-item">
        Explore
      </Link>
    </div>
  )
}

export default TopMenu
