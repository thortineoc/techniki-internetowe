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
import {
  Button,
  IconButton,
  InputAdornment,
  Menu,
  TextField
} from '@mui/material'
import Footer from '../../Shared/Footer/Footer'
import { FilterList, Search } from '@material-ui/icons'
import FilterDropdown from '../../Shared/FilterDropdown/FilterDropdown'
import SearchBar from '../../Shared/SearchBar/SearchBar'

function AllPlacesPage() {
  const { user } = useSelector((state: any) => state.userReducer)
  const [apiData, setApiData] = useState<PlacesData[]>([])
  const [initialData, setInitialData] = useState<PlacesData[]>([])
  const [userFavs, setUserFavs] = useState([])

  const addToFavourites = (placeId: number): void => {
    axios.put('https://localhost:5001/api/Favourite/', {
      UserId: user.id,
      PlaceId: placeId
    }).then((response) => {
      console.log(response)
      console.log('Added to favourites')
      fetchUserFavs()
    })
      .catch((err) => {
        console.log(err)
      })
  }

  const removeFromFavourites = (favId: number): void => {
    console.log('removeFromFavourites handler: ' + favId)
    if (userFavs) {
      axios
        .delete('https://localhost:5001/api/Favourite/' + favId)
        .then(() => fetchUserFavs())
        .catch((err) => console.error(err))
    } else {
      console.error('userFavs not ready!')
    }
  }

  const fetchPublicPlaces = () => {
    axios
      .get('https://localhost:5001/api/Places')
      .then((response) => {
        console.log(response.data)
        let structuredResponse: any = response.data.map((place: any) => {
          let button: ReactElement<any, any> = <Button>eror</Button>
          let fav: any = userFavs.find((fav: any) => fav.place.placeId === place.placeId)
          if (fav && fav.id) {
            if (fav.id) {
              button = <Button onClick={() => {
                console.log('Removing from favs')
                removeFromFavourites(fav.id)
              }}>Remove from favourites</Button>
            } else {
              console.error('fav without id')
            }
          } else {
            button = <Button onClick={() => {
              console.log('Adding to favs')
              addToFavourites(place.placeId)
            }}>Add to favourites</Button>
          }

          let meanRating = NaN
          if (place.ratings && place.ratings.length > 0) {
            let reducer = (total: any, currentValue: any) => {
              return total.rate + currentValue.rate
            }
            meanRating =
              place.ratings.length === 1
                ? place.ratings[0].rate
                : place.ratings.reduce(reducer) / place.ratings.length
          }
          let my_rate = NaN
          place.ratings.forEach((rate: any) => {
            if (rate.appUserId === user.id) {
              my_rate = rate.rate
            }
          })
          let tmp: PlacesData = {
            id: place.placeId,
            placeId: place.placeId,
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
        })
        setApiData(structuredResponse)
        setInitialData(structuredResponse)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  let fetchUserFavs = () => {
    axios.get('https://localhost:5001/api/Favourite/' + user.id)
      .then((response) => {
        let userFavs = response.data
        console.log(userFavs)
        setUserFavs(userFavs)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  let rateHandler = function ratePlace(id: number, value: number): void {
    console.log("rating place: " + id + " with: " + value)
    axios
      .put('https://localhost:5001/api/Rating', {
        AppUserId: user.id,
        PlaceId: id,
        Rate: value
      })
      .then((response) => {
        fetchPublicPlaces()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchUserFavs()
  }, [])

  useEffect(() => {
    fetchPublicPlaces()
  }, [userFavs])


  let config: PlacesConfig = {
    type: TableType.Places,
    placesHeads: PlacesHeadCells,
    data: apiData,
    selectable: false,
    onClick_rating: rateHandler,
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')

  useEffect(() => {
    config.data = initialData
      .filter((val: any) => {
        if (searchTerm === '' || searchTerm == null) {
          return val
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }
      })
      .filter((val: any) => {
        if (categoryFilter === '' || categoryFilter == null) {
          return val
        } else if (
          val.category.toLowerCase().includes(categoryFilter.toLowerCase())
        ) {
          return val
        }
      })
      .filter((val: any) => {
        if (countryFilter === '' || countryFilter == null) {
          return val
        } else if (
          val.country.toLowerCase().includes(countryFilter.toLowerCase())
        ) {
          return val
        }
      })
      .filter((val: any) => {
        if (cityFilter === '' || cityFilter == null) {
          return val
        } else if (val.city.toLowerCase().includes(cityFilter.toLowerCase())) {
          return val
        }
      })
      .filter((val: any) => {
        if (locationFilter === '' || locationFilter == null) {
          return val
        } else if (
          val.loc.toLowerCase().includes(locationFilter.toLowerCase())
        ) {
          return val
        }
      })

    setApiData(config.data)
  }, [searchTerm, categoryFilter, countryFilter, cityFilter, locationFilter])

  return (
    <div className='AllPlacesPage'>
      <div className='AllPlacesPage-top-row'>
        <h1>All places 🚀</h1>
        <div className="table-controls">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterDropdown
            setCategoryFilter={setCategoryFilter}
            setCountryFilter={setCountryFilter}
            setCityFilter={setCityFilter}
            setLocationFilter={setLocationFilter}
            categoryFilter={categoryFilter}
            countryFilter={countryFilter}
            cityFilter={cityFilter}
            locationFilter={locationFilter}
          />
        </div>
      </div>
      <GenericTable {...config} />
      <Footer />
    </div>
  )
}

export default AllPlacesPage
