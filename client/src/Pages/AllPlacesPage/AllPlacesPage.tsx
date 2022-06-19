import React, { useEffect, useState } from 'react'
import './AllPlacesPage.scss'
import axios from 'axios'
import TableType from '../../Shared/Table/TableType'
import GenericTable from '../../Shared/Table/Table'
import PlacesConfig, { PlacesData, PlacesHeadCells } from '../../Shared/Table/configs/PlacesTableConfig'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'

function AllPlacesPage() {
  const { user } = useSelector((state: any) => state.userReducer)
  const [apiData, setApiData] = useState([])

  const fetchPublicPlaces = () => {
    axios.get('https://localhost:5001/api/Places')
      .then((response) => {
        console.log(response.data)
        let structuredResponse: any = response.data.map((place: any) => {
            let meanRating = NaN
            if (place.ratings && place.ratings.length > 0) {
              let reducer = (total: any, currentValue: any) => {
                return total.rate + currentValue.rate
              }
              meanRating = place.ratings.length === 1
                ? place.ratings[0].rate :
                place.ratings.reduce(reducer) / place.ratings.length
            }
            let my_rate = NaN
            place.ratings.forEach((rate: any) => {
              if (rate.appUserId === user.id) {
                my_rate = rate.rate
              }
            })
            let tmp: PlacesData = {
              id: place.placeId,
              name: place.name,
              country: place.country,
              city: place.city,
              loc: place.location,
              category: place.category,
              rating: meanRating,
              my_rating: my_rate,
              actions: [<Button onClick={() => {console.log("hello place id: " + place.placeId)}}>Add to favourites</Button>,],
            }
            return tmp
          }
        )
        setApiData(structuredResponse)
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchPublicPlaces()
  }, [])

  let config: PlacesConfig = {
    type: TableType.Places,
    placesHeads: PlacesHeadCells,
    data: apiData,
    selectable: false,
  }

  return (
    <div className="AllPlacesPage">
      <div className="AllPlacesPage-top-row">
        <h1>All places 🚀</h1>
      </div>
      <GenericTable {...config} />
    </div>
  )
}

export default AllPlacesPage
