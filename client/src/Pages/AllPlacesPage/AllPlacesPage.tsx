import React, { useEffect, useState } from 'react'
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
        setInitialData(structuredResponse)
      })
      .catch((err) => {
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
    selectable: false
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
    <div className="AllPlacesPage">
      <div className="AllPlacesPage-top-row">
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
