import React, { useEffect, useState } from 'react'
import './PlacesAddedByUserPage.scss'
import FavouritesConfig, { FavouritesHeadCells } from '../../Shared/Table/configs/FavouritesTableConfig'
import TableType from '../../Shared/Table/TableType'
import axios from 'axios'
import GenericTable from '../../Shared/Table/Table'
import { useSelector } from 'react-redux'

function PlacesAddedByUserPage() {
  const { user } = useSelector((state: any) => state.userReducer)
  const [apiData, setApiData] = useState([])

  const fetchUserPlaces = () => {
    axios.get('https://localhost:5001/api/Places/')
      .then((response) => {
        console.log(response.data)
        let structuredResponse: any = response.data
          .filter((place: any) => {
            return place.appUserId === user.id
          })
          .map((place: any) => {
            let meanRating = NaN
            if (place.ratings && place.ratings.length > 0) {
              let reducer = (total: any, currentValue: any) => {
                return total.rate + currentValue.rate
              }
              meanRating = place.ratings.length === 1
                ? place.ratings[0].rate :
                place.ratings.reduce(reducer) / place.ratings.length
            }
            let my_rate = null
            place.ratings.forEach((rate: any) => {
              if (rate.appUserId === user.id) {
                my_rate = rate.rate
              }
            })
          console.log(place)
            return {
              id: place.placeId,
              name: place.name,
              country: place.country,
              city: place.city,
              loc: place.location,
              category: place.category,
              rating: meanRating,
              my_rating: my_rate ?? 0
            }
          }
        )
        setApiData(structuredResponse)
        console.log(structuredResponse)
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchUserPlaces()
  }, [])

  let rateHandler = function ratePlace(id: number, value: number): void {
    axios.put('https://localhost:5001/api/Rating',
      {
        AppUserId: user.id,
        PlaceId: id,
        Rate: value
      })
      .then((response) => {
        fetchUserPlaces()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  let deletePlaceHandler = function(id: readonly number[]): void {
    id.forEach(id => {
      console.log('Deleting fav with id: ' + id)
      axios.delete('https://localhost:5001/api/Places/' + id)
        .then(() => fetchUserPlaces())
        .catch((err) => console.error(err))
    })
  }

  let config: FavouritesConfig = {
    type: TableType.Favourites,
    favouritesHeads: FavouritesHeadCells,
    data: apiData,
    selectable: true,
    onClick_rating: rateHandler,
    onClick_fav_delete: deletePlaceHandler
  }

  console.log(apiData)

  return <div className='PlacesAddedByUserPage'>
    <GenericTable {...config} />
  </div>
}

export default PlacesAddedByUserPage
