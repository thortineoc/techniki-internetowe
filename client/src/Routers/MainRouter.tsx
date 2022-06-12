import React, { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from '../Pages/Homepage/Homepage'
import FavouritesPage from '../Pages/FavouritesPage/FavouritesPage'
import PlacesAddedByUserPage from '../Pages/PlacesAddedByUserPage/PlacesAddedByUserPage'
import AllPlacesPage from '../Pages/AllPlacesPage/AllPlacesPage'

function MainRouter(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/added" element={<PlacesAddedByUserPage />} />
      <Route path="/all" element={<AllPlacesPage />} />
    </Routes>
  )
}

export default MainRouter
