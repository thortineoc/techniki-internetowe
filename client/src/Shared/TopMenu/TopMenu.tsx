import React, { useState } from 'react'
import './TopMenu.scss'
import { Link } from 'react-router-dom'

function TopMenu() {
  const [exploreActive, setExploreActive] = useState<boolean>(true)
  const [favsActive, setFavsActive] = useState<boolean>(false)
  const [addedActive, setAddedActive] = useState<boolean>(false)

  const handleExploreClick = (): void => {
    setExploreActive(true)
    setFavsActive(false)
    setAddedActive(false)
  }

  const handleFavsClick = (): void => {
    setExploreActive(false)
    setFavsActive(true)
    setAddedActive(false)
  }

  const handleAddedClick = (): void => {
    setExploreActive(false)
    setFavsActive(false)
    setAddedActive(true)
  }

  return (
    <div className="TopMenu">
      <Link
        to="/all"
        className={exploreActive ? 'TopMenu-item active' : 'TopMenu-item'}
        onClick={handleExploreClick}>
        Explore
      </Link>
      <Link
        to="/favourites"
        className={favsActive ? 'TopMenu-item active' : 'TopMenu-item'}
        onClick={handleFavsClick}>
        My favourites
      </Link>
      <Link
        to="/added"
        className={addedActive ? 'TopMenu-item active' : 'TopMenu-item'}
        onClick={handleAddedClick}>
        Added by me
      </Link>
    </div>
  )
}

export default TopMenu
