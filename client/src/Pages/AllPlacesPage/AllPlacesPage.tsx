import React, { ReactElement, useEffect, useState } from 'react'
import './AllPlacesPage.scss'
import axios from 'axios'
import TableType from '../../Shared/Table/TableType'
import GenericTable from '../../Shared/Table/Table'
import PlacesConfig, {
  PlacesData,
  PlacesHeadCells
} from '../../Shared/Table/configs/PlacesTableConfig'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import Footer from '../../Shared/Footer/Footer'

function AllPlacesPage() {
  const { user } = useSelector((state: any) => state.userReducer)
  const [apiData, setApiData] = useState([])
  const [userFavs, setUserFavs] = useState([])

  let favsReady: boolean = false

  const addToFavourites = (placeId: number): void => {
    console.log('Adding to favourites placeId: ' + placeId)
    axios.put('https://localhost:5001/api/Favourite/', {
      UserId: user.id,
      PlaceId: placeId
    }).then((response) => {
      console.log(response)
      console.log('Added to favourites')
    })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchPublicPlaces = () => {
    axios
      .get('https://localhost:5001/api/Places')
      .then((response) => {
        console.log(response.data)
        let structuredResponse: any = response.data.map((place: any) => {
          let meanRating = NaN
          if (place.ratings && place.ratings.length > 0) {
            let reducer = (total: any, currentValue: any) => {
              return total.rate + currentValue.rate
            }
<<<<<<< HEAD
            meanRating =
              place.ratings.length === 1
                ? place.ratings[0].rate
                : place.ratings.reduce(reducer) / place.ratings.length
=======
            let my_rate = NaN
            place.ratings.forEach((rate: any) => {
              if (rate.appUserId === user.id) {
                my_rate = rate.rate
              }
            })

            let button: ReactElement<any, any>
            if (userFavs.filter(i => i === place.placeId).length) {
              button = <Button>Remove button</Button>
            } else {
              button = <Button onClick={() => {
                addToFavourites(place.placeId)
              }}>Add to favourites</Button>
            }

            let tmp: PlacesData = {
              id: place.placeId,
              name: place.name,
              country: place.country,
              city: place.city,
              loc: place.location,
              category: place.category,
              rating: meanRating,
              my_rating: my_rate,
              actions: [button]
            }
            return tmp
>>>>>>> P-14_table
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
            actions: [
              <Button
                onClick={() => {
                  console.log('hello place id: ' + place.placeId)
                }}>
                Add to favourites
              </Button>
            ]
          }
          return tmp
        })
        setApiData(structuredResponse)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  let fetchUserFavsIds = () => {
    axios.get('https://localhost:5001/api/Favourite/' + user.id)
      .then((response) => {
        let userFavs = response.data.map((fav: any) => fav.place.placeId)
        console.log(userFavs)
        setUserFavs(userFavs)
        console.log("Setting favs ready")
        favsReady = true
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    // console.log("Use effect")
    // if (favsReady) {
    //   console.log("Fetching places")
       fetchPublicPlaces()
    // } else {
      console.log("Fetching user favs")
//      fetchUserFavsIds()
    //}
  }, [favsReady])

  let config: PlacesConfig = {
    type: TableType.Places,
    placesHeads: PlacesHeadCells,
    data: apiData,
    selectable: false
  }

  return (
    <div className="AllPlacesPage">
      <div className="AllPlacesPage-top-row">
        <h1>All places 🚀</h1>
      </div>
      <GenericTable {...config} />
      <Footer />
    </div>
  )
}

export default AllPlacesPage
