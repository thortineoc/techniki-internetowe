import { Button } from '@material-ui/core'
import React from 'react'
import './Homepage.scss'

function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage-textbox">
        <h1 className="homepage-title">Polecajka</h1>
        <div>
          Welcome to Polecajka app. You can find your favourite places, save
          them and rate. You can also see others favourite spots and later check
          them out. Look across many avaliable locations.
        </div>
      </div>
    </div>
  )
}

export default Homepage
