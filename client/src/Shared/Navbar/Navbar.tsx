import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../store'
import './Navbar.scss'

export default function Navbar() {
  const dispatch = useDispatch()
  const { setLoginModal, setRegistrationModal, logout } = bindActionCreators(
    actionCreators,
    dispatch
  )
  const { user } = useSelector((state: any) => state.userReducer)
  const navigate = useNavigate()

  return (
    <div className="navbar">
      <div>
        <div className="navbar-icons">
          <span className="navbar-star-icon">⭐</span>
          <span className="navbar-hands-icon">👐</span>
        </div>
      </div>
      {user === null ? (
        <div className="navbar-btn-group">
          <Button variant="contained" onClick={() => setLoginModal(true)}>
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => setRegistrationModal(true)}>
            Register
          </Button>
        </div>
      ) : (
        <Button
          className="navbar-logout-btn"
          variant="contained"
          onClick={() => {
            logout()
            navigate('/')
          }}>
          Logout
        </Button>
      )}
    </div>
  )
}
