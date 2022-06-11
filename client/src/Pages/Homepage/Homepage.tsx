import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from '../../Shared/Modal/Modal'
import { actionCreators } from '../../store'
import { IStore } from '../../store/interfaces'
import './Homepage.scss'
import LoginForm from './LoginForm/LoginForm'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import { Snackbar, Alert } from '@mui/material'

function Homepage() {
  const { showLoginModal, showRegistrationModal, formError, formSuccess } =
    useSelector((state: IStore) => state.showModalReducer)
  const dispatch = useDispatch()
  const { setLoginModal, setRegistrationModal, setFormError, setFormSuccess } =
    bindActionCreators(actionCreators, dispatch)

  const handleCloseFormError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setFormError(null)
  }

  const handleCloseFormSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setFormSuccess(null)
  }

  return (
    <div>
      <div className="homepage">
        <div className="homepage-textbox">
          <h1 className="homepage-title">Polecajka</h1>
          <div>
            Welcome to Polecajka app. You can find your favourite places 🗺️,
            save them 📍 and rate ⭐. You can also add new spots so others may
            check them out. Look across many avaliable locations 🥡💈🏀.
          </div>
        </div>
      </div>
      <Modal isOpen={showLoginModal} setIsOpen={setLoginModal}>
        <LoginForm />
      </Modal>
      <Modal isOpen={showRegistrationModal} setIsOpen={setRegistrationModal}>
        <RegistrationForm />
      </Modal>
      <Snackbar
        open={!!formError}
        autoHideDuration={6000}
        onClose={handleCloseFormError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          onClose={handleCloseFormError}
          severity="error"
          sx={{ width: '100%' }}>
          {formError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!formSuccess}
        autoHideDuration={6000}
        onClose={handleCloseFormSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          onClose={handleCloseFormSuccess}
          severity="success"
          sx={{ width: '100%' }}>
          {formSuccess}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Homepage
