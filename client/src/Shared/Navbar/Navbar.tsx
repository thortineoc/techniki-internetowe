import { Button } from '@material-ui/core'
import React from 'react'
import './Navbar.scss'

export default function Navbar() {
  return (
    <div className="navbar">
      <div>
        <div className="navbar-icons">
          <span className="navbar-star-icon">⭐</span>
          <span className="navbar-hands-icon">👐</span>
        </div>
      </div>
      <div className="navbar-btn-group">
        <Button variant="contained">Login</Button>
        <Button variant="contained">Register</Button>
      </div>
    </div>
  )
}
