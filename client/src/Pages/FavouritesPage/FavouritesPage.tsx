import React, { useEffect, useState } from 'react'
import './FavouritesPage.scss'
import axios from 'axios'
import GenericTable from '../../Shared/Table/Table'
import TableType from '../../Shared/Table/TableType'
import FavouritesConfig, {
  FavouritesHeadCells
} from '../../Shared/Table/configs/FavouritesTableConfig'
import { useSelector } from 'react-redux'
import Footer from '../../Shared/Footer/Footer'

function FavouritesPage() {
  const [apiData, setApiData] = useState([])
  const { user } = useSelector((state: any) => state.userReducer)
  const fetchFavourites = () => {
    axios
      .get('https://localhost:5001/api/Favourite/' + user.id)
      .then((response) => {
        let structuredResponse: any = response.data.map((userPlace: any) => {
          let meanRating = NaN
          if (userPlace.place.ratings && userPlace.place.ratings.length > 0) {
            let reducer = (total: any, currentValue: any) => {
              return total.rate + currentValue.rate
            }
            meanRating =
              userPlace.place.ratings.length === 1
                ? userPlace.place.ratings[0].rate
                : userPlace.place.ratings.reduce(reducer) /
                  userPlace.place.ratings.length
          }
          let my_rate = null
          userPlace.place.ratings.forEach((rate: any) => {
            if (rate.appUserId === user.id) {
              my_rate = rate.rate
            }
          })
          console.log(response.data)
          return {
            placeId: userPlace.place.placeId,
            id: userPlace.id,
            name: userPlace.place.name,
            country: userPlace.place.country,
            city: userPlace.place.city,
            loc: userPlace.place.location,
            category: userPlace.place.category,
            rating: meanRating,
            my_rating: my_rate ?? 0
          }
        })
        setApiData(structuredResponse)
        console.log(structuredResponse)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchFavourites()
  }, [])

  let rateHandler = function ratePlace(id: number, value: number): void {
    console.log("rating place: " + id + " with: " + value)
    axios
      .put('https://localhost:5001/api/Rating', {
        AppUserId: user.id,
        PlaceId: id,
        Rate: value
      })
      .then((response) => {
        fetchFavourites()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  let deleteFavouriteHandler = function (id: readonly number[]): void {
    id.forEach((id) => {
      console.log('Deleting fav with id: ' + id)
      axios
        .delete('https://localhost:5001/api/Favourite/' + id)
        .then(() => fetchFavourites())
        .catch((err) => console.error(err))
    })
  }

  let config: FavouritesConfig = {
    type: TableType.Favourites,
    favouritesHeads: FavouritesHeadCells,
    data: apiData,
    selectable: true,
    onClick_rating: rateHandler,
    onClick_fav_delete: deleteFavouriteHandler
  }

  return (
    <div className="FavouritesPage">
      <div className="FavouritesPage-top-row">
        <h1>My favourites places 💖</h1>
      </div>
      <GenericTable {...config} />
      <Footer />
    </div>
  )
}

export default FavouritesPage
