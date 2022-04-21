import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../store'
import './Navbar.scss'

export default function Navbar() {
  const dispatch = useDispatch()
  const { setLoginModal, setRegistrationModal } = bindActionCreators(
    actionCreators,
    dispatch
  )

  return (
    <div className="navbar">
      <div>
        <div className="navbar-icons">
          <span className="navbar-star-icon">⭐</span>
          <span className="navbar-hands-icon">👐</span>
        </div>
      </div>
      <div className="navbar-btn-group">
        <Button variant="contained" onClick={() => setLoginModal(true)}>
          Login
        </Button>
        <Button variant="contained" onClick={() => setRegistrationModal(true)}>
          Register
        </Button>
      </div>
    </div>
  )
}
