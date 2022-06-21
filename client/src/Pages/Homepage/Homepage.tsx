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
import React, { useEffect, useState } from 'react'
import PublicPlacesConfig, {
  PublicPlacesData,
  PublicPlacesHeadCells
} from '../../Shared/Table/configs/PublicPlacesTableConfig'
import TableType from '../../Shared/Table/TableType'
import axios from 'axios'
import Footer from '../../Shared/Footer/Footer'
import { Button } from '@material-ui/core'

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

  const fetchPublicPlaces = () => {
    axios
      .get('https://localhost:5001/api/Places')
      .then((response) => {
        console.log(response.data)
        let structuredResponse: any = response.data.map((place: any) => {
          let meanRating = 0
          if (place.ratings && place.ratings.length > 0) {
            let reducer = (total: any, currentValue: any) => {
              return total.rate + currentValue.rate
            }
            meanRating =
              place.ratings.length === 1
                ? place.ratings[0].rate
                : place.ratings.reduce(reducer) / place.ratings.length
          }
          console.log(response.data)
          let tmp: PublicPlacesData = {
            id: place.placeId,
            placeId: place.placeId,
            name: place.name,
            country: place.country,
            city: place.city,
            loc: place.location,
            category: place.category,
            rating: meanRating
          }
          return tmp
        })
        setApiData(structuredResponse)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  console.log(apiData)

  useEffect(() => {
    fetchPublicPlaces()
  }, [])

  let config1: PublicPlacesConfig = {
    type: TableType.PublicPlaces,
    publicPlacesHeads: PublicPlacesHeadCells,
    data: apiData,
    selectable: false
  }

  const firstItemRef = React.createRef<HTMLDivElement>()

  return (
    <div>
      <div className="homepage">
        <div className="homepage-textbox">
          <h1 className="homepage-title">Polecajka</h1>
          <div>
            Welcome to Polecajka app. You can find your favourite places 🗺️,
            save them 📍 and rate ⭐. You can also add new spots so others may
            check them out. Look across many available locations 🥡💈🏀.
          </div>
        </div>
        <div className="top-ten-btn-wrapper">
          <Button
            color="primary"
            variant="contained"
            className="top-ten-btn"
            onClick={() =>
              firstItemRef &&
              firstItemRef.current &&
              firstItemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
              })
            }>
            See our top 10 places
          </Button>
        </div>
        <div ref={firstItemRef} className="table-wrapper">
          <GenericTable {...config1} />
        </div>
        <Footer />
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
