import React, { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from '../Pages/Homepage/Homepage'
import MapPage from '../Pages/MapPage/MapPage'

function MainRouter(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  )
}

export default MainRouter
