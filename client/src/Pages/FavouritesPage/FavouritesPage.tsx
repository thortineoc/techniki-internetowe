import React, { useEffect } from 'react'
import './FavouritesPage.scss'
import axios from 'axios'

function FavouritesPage() {
  console.log("Hello!")
  useEffect(() =>
  {
    axios
      .get('https://localhost:5001/api/Favourite')
      .then((response) => {
        console.log(response)
      })
  })
  return <div className="FavouritesPage">My favs!</div>
}

export default FavouritesPage
