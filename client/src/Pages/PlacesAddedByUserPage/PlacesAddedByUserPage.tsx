import React from 'react'
import './PlacesAddedByUserPage.scss'
import { Button } from '@material-ui/core'

function PlacesAddedByUserPage() {
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
          className="PlacesAddedByUserPage-btn">
          Add a new place
        </Button>
      </div>
    </div>
  )
}

export default PlacesAddedByUserPage
