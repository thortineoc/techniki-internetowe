import React, { useEffect, useState } from 'react'
import './PlacesAddedByUserPage.scss'
import { Button } from '@material-ui/core'
import Modal from '../../Shared/Modal/Modal'
import AddNewPlaceForm from './AddNewPlaceForm/AddNewPlaceForm'
import FavouritesConfig, {
  FavouritesHeadCells
} from '../../Shared/Table/configs/FavouritesTableConfig'
import TableType from '../../Shared/Table/TableType'
import axios from 'axios'
import GenericTable from '../../Shared/Table/Table'
import { useSelector } from 'react-redux'
import Footer from '../../Shared/Footer/Footer'
import SearchBar from '../../Shared/SearchBar/SearchBar'
import FilterDropdown from '../../Shared/FilterDropdown/FilterDropdown'
import { PlacesData } from '../../Shared/Table/configs/PlacesTableConfig'

function PlacesAddedByUserPage() {
  const { user } = useSelector((state: any) => state.userReducer)
  const [apiData, setApiData] = useState<PlacesData[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [initialData, setInitialData] = useState<PlacesData[]>([])

  useEffect(() => {
    if (!isOpen) {
      fetchUserPlaces()
    }
  }, [isOpen])

  const fetchUserPlaces = () => {
    axios
      .get('https://localhost:5001/api/Places/')
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
              meanRating =
                place.ratings.length === 1
                  ? place.ratings[0].rate
                  : place.ratings.reduce(reducer) / place.ratings.length
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
          })
        setApiData(structuredResponse)
        setInitialData(structuredResponse)
        console.log(structuredResponse)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  let rateHandler = function ratePlace(id: number, value: number): void {
    axios
      .put('https://localhost:5001/api/Rating', {
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

  let deletePlaceHandler = function (id: readonly number[]): void {
    id.forEach((id) => {
      console.log('Deleting fav with id: ' + id)
      axios
        .delete('https://localhost:5001/api/Places/' + id)
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
    <div className="PlacesAddedByUserPage">
      <div className="PlacesAddedByUserPage-top-row">
        <div className="PlacesAddedByUserPage-top-left-block">
          <h1>Places added by me 💁</h1>
        </div>
        <div className="table-controls">
          <Button
            color="primary"
            variant="contained"
            size="medium"
            className="PlacesAddedByUserPage-btn"
            onClick={() => setIsOpen(true)}>
            Add a new place
          </Button>

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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <AddNewPlaceForm setIsOpen={setIsOpen} />
      </Modal>
    </div>
  )
}

export default PlacesAddedByUserPage
