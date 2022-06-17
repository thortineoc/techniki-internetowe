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
import React, { useEffect, useState  } from 'react'
import PublicPlacesConfig, {
  PublicPlacesData,
  PublicPlacesHeadCells
} from '../../Shared/Table/configs/PublicPlacesTableConfig'
import TableType from '../../Shared/Table/TableType'
import PlacesConfig, { PlacesHeadCells } from '../../Shared/Table/configs/PlacesTableConfig'
import FavouritesConfig, { FavouritesHeadCells } from '../../Shared/Table/configs/FavouritesTableConfig'
import RatingConfig, { RatingHeadCells } from '../../Shared/Table/configs/RatingsTableConfig'
import axios from 'axios'

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

  const [apiData, setApiData] = useState([])

  const fetchData = () => {
    axios.get('https://localhost:5001/api/Places')
      .then((response) => {
        console.log(response.data)
        setApiData(response.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  let config1: PublicPlacesConfig = {
    type: TableType.PublicPlaces,
    publicPlacesHeads: PublicPlacesHeadCells,
    data: apiData
      // [
    //   {
    //     name: 'kurde',
    //     country: 'no',
    //     city: 'dzialaj',
    //     loc: 'dzis',
    //     category: 'pls',
    //     rating: 5
    //   },
    //   {
    //     name: 'kurde1',
    //     country: 'no1',
    //     city: 'dzialaj1',
    //     loc: 'dzis1',
    //     category: 'pls1',
    //     rating: 1
    //   }
    // ]
  }

  let config2: PlacesConfig = {
    type: TableType.Places,
    placesHeads: PlacesHeadCells,
    data: [
      {
        name: 'rat 3 myrat 4',
        country: 'country',
        city: 'city',
        loc: 'location',
        category: 'cat',
        rating: 3,
        my_rating: 4
      },
      {
        name: 'rat 1 myrat 2',
        country: 'no1',
        city: 'dzialaj1',
        loc: 'dzis1',
        category: 'pls1',
        rating: 1,
        my_rating: 2
      }
    ]
  }

  let config3: FavouritesConfig = {
    type: TableType.Favourites,
    favouritesHeads: FavouritesHeadCells,
    data: [
      {
        name: 'name FAVS',
        country: 'country',
        city: 'city',
        loc: 'location',
        category: 'cat',
        rating: 5,
        my_rating: 3.5
      },
      {
        name: 'kurde1',
        country: 'no1',
        city: 'dzialaj1',
        loc: 'dzis1',
        category: 'pls1',
        rating: 3,
        my_rating: 4.5
      }
    ]
  }

  let config4: RatingConfig = {
    type: TableType.Ratings,
    ratingHeads: RatingHeadCells,
    data: [
      {
        name: 'name ratings',
        country: 'country',
        city: 'city',
        loc: 'location',
        category: 'cat',
        rating: 1,
        my_rating: 1.5
      },
      {
        name: 'kurde1',
        country: 'no1',
        city: 'dzialaj1',
        loc: 'dzis1',
        category: 'pls1',
        rating: 2.5,
        my_rating: 0.5
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

        <GenericTable {...config1} />

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
