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
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
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

  useEffect(() => {
    config.data = initialData.filter((val: any) => {
      if (searchTerm === '' || searchTerm == null) {
        return val
      } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val
      }
    })
    console.log('EEEEEEEEE')
    console.log(config.data)
    setApiData(config.data)
  }, [searchTerm])

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
        <IconButton aria-label="filter" className="filter-icon">
          <FilterList />
        </IconButton>
      </div>
      <GenericTable {...config} />
      <Footer />
    </div>
  )
}

export default AllPlacesPage
