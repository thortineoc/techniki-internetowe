import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from '../../Shared/Modal/Modal'
import { actionCreators } from '../../store'
import { IStore } from '../../store/interfaces'
import './Homepage.scss'
import LoginForm from './LoginForm/LoginForm'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import { Alert, Snackbar } from '@mui/material'
import GenericTable from '../../Shared/Table/Table'
import React from 'react'
import PublicPlacesConfig, { PublicPlacesHeadCells } from '../../Shared/Table/PublicPlacesTableConfig'
import TableType from '../../Shared/Table/TableType'
import PlacesConfig, { PlacesHeadCells } from '../../Shared/Table/PlacesTableConfig'

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

  let config: PublicPlacesConfig = {
    type: TableType.PublicPlaces,
    publicPlacesHeads: PublicPlacesHeadCells,
    data: [
      {
        name: 'kurde',
        country: 'no',
        city: 'dzialaj',
        loc: 'dzis',
        category: 'pls',
        rating: 'no'
      },
      {
        name: 'kurde1',
        country: 'no1',
        city: 'dzialaj1',
        loc: 'dzis1',
        category: 'pls1',
        rating: 'no1'
      }
    ]
  }

  let config2: PlacesConfig = {
    type: TableType.Places,
    placesHeads: PlacesHeadCells,
    data: [
      {
        name: 'name',
        country: 'country',
        city: 'city',
        loc: 'location',
        category: 'cat',
        rating: 'rating',
        my_rating: "my_r"
      },
      {
        name: 'kurde1',
        country: 'no1',
        city: 'dzialaj1',
        loc: 'dzis1',
        category: 'pls1',
        rating: 'no1',
        my_rating: "2"
      }
    ]
  }

  return (
    <div>
      <div className='homepage'>
        <div className='homepage-textbox'>
          <h1 className='homepage-title'>Polecajka</h1>
          <div>
            Welcome to Polecajka app. You can find your favourite places 🗺️,
            save them 📍 and rate ⭐. You can also add new spots so others may
            check them out. Look across many available locations 🥡💈🏀.
          </div>
        </div>

        <GenericTable {...config2} />

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
          severity='error'
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
          severity='success'
          sx={{ width: '100%' }}>
          {formSuccess}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Homepage
