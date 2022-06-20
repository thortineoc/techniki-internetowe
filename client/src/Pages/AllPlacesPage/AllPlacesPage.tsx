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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="AllPlacesPage">
      <div className="AllPlacesPage-top-row">
        <h1>All places 🚀</h1>
        <div className="search-bars-container">
          <TextField
            placeholder="Search by name..."
            style={{ backgroundColor: 'white', borderRadius: 3, width: '30vw' }}
            sx={{ width: 250 }}
            size="small"
            label="Title"
            onChange={(event: any) => setSearchTerm(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </div>
        <IconButton
          aria-label="filter"
          className="filter-icon"
          onClick={handleClick}>
          <FilterList />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          elevation={0}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          PaperProps={{
            style: {
              width: '270px',
              height: '300px',
              padding: '10px',
              boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
            }
          }}>
          <div className="list-item">
            <TextField
              placeholder="Search by category..."
              sx={{ width: 250 }}
              size="small"
              label="Category"
              name="category"
              onChange={(event: any) => setCategoryFilter(event.target.value)}
              value={categoryFilter}
            />
          </div>
          <div className="list-item">
            <TextField
              placeholder="Search by country..."
              sx={{ width: 250 }}
              size="small"
              label="Country"
              name="country"
              onChange={(event: any) => setCountryFilter(event.target.value)}
              value={countryFilter}
            />
          </div>
          <div className="list-item">
            <TextField
              placeholder="Search by city..."
              sx={{ width: 250 }}
              size="small"
              label="City"
              name="city"
              onChange={(event: any) => setCityFilter(event.target.value)}
              value={cityFilter}
            />
          </div>
          <div className="list-item">
            <TextField
              placeholder="Search by location..."
              sx={{ width: 250 }}
              size="small"
              label="Location"
              name="location"
              onChange={(event: any) => setLocationFilter(event.target.value)}
              value={locationFilter}
            />
          </div>
        </Menu>
      </div>
      <GenericTable {...config} />
      <Footer />
    </div>
  )
}

export default AllPlacesPage
