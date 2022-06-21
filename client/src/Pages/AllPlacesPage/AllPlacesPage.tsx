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
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

function AllPlacesPage() {
  const { user } = useSelector((state: any) => state.userReducer)
  const [apiData, setApiData] = useState<PlacesData[]>([])
  const [initialData, setInitialData] = useState<PlacesData[]>([])
  const [userFavs, setUserFavs] = useState([])
  const [allUsers, setAllUsers] = useState([])

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
              button = <HeartBrokenIcon onClick={() => {
                console.log('Removing from favs')
                removeFromFavourites(fav.id)
              }}>Remove from favourites</HeartBrokenIcon>
            } else {
              console.error('fav without id')
            }
          } else {
            button = <FavoriteIcon onClick={() => {
              console.log('Adding to favs')
              addToFavourites(place.placeId)
            }}>Add to favourites</FavoriteIcon>
          }

          let meanRating = 0
          if (place.ratings && place.ratings.length > 0) {
            let reducer = (total: any, currentValue: any) => {
              return total.rate + currentValue.rate
            }
            meanRating =
              place.ratings.length === 1
                ? place.ratings[0].rate
                : place.ratings.reduce(reducer) / place.ratings.length
          }
          let my_rate = 0
          place.ratings.forEach((rate: any) => {
            if (rate.appUserId === user.id) {
              my_rate = rate.rate
            }
          })
          let userObj: any = allUsers.find((u: any) => u.id === place.appUserId)
          let userName = ''
          if (user && userObj.name) {
            userName = userObj.name
          }
          console.log(userName)
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
            added_by: userName,
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
  let fetchAllUsers = () => {
    axios.get('https://localhost:5001/api/Users/')
      .then((response) => {
        let users = response.data.map((u: any) => {
          return {
            id: u.id,
            name: u.userName
          }
        })
        setAllUsers(users)
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

  useEffect(()=> {
    fetchAllUsers()
  }, [])

  useEffect(() => {
    fetchUserFavs()
  }, [allUsers])

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
  const [userFilter, setUserFilter] = useState('')

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
      .filter((val: any) => {
        if (userFilter === '' || userFilter == null) {
          return val
        } else if (
          val.added_by.toLowerCase().includes(userFilter.toLowerCase())
        ) {
          return val
        }
      })

    setApiData(config.data)
  }, [searchTerm, categoryFilter, countryFilter, cityFilter, locationFilter, userFilter])

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
            setUserFilter={setUserFilter}
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
