import React, { useState } from 'react'
import './PlacesAddedByUserPage.scss'
import { Button } from '@material-ui/core'
import Modal from '../../Shared/Modal/Modal'
import AddNewPlaceForm from './AddNewPlaceForm/AddNewPlaceForm'

function PlacesAddedByUserPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="PlacesAddedByUserPage">
      <div className="PlacesAddedByUserPage-top-row">
        <div className="PlacesAddedByUserPage-top-left-block">
          <h1>Places added by me 💁</h1>
        </div>
        <Button
          color="primary"
          variant="contained"
          size="medium"
          className="PlacesAddedByUserPage-btn"
          onClick={() => setIsOpen(true)}>
          Add a new place
        </Button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <AddNewPlaceForm setIsOpen={setIsOpen} />
        </Modal>
      </div>
    </div>
  )
}

export default PlacesAddedByUserPage
