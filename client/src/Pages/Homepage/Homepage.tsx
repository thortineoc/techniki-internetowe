import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import Modal from '../../Shared/Modal/Modal'
import './Homepage.scss'

function Homepage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="homepage">
        <div className="homepage-textbox">
          <h1 className="homepage-title">Polecajka</h1>
          <div>
            Welcome to Polecajka app. You can find your favourite places 🗺️,
            save them 📍 and rate ⭐. You can also see others' 👩👨 favourites
            spots and later check them out. Look across many avaliable locations
            🥡💈🏀.
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        :))))
      </Modal>
    </div>
  )
}

export default Homepage
