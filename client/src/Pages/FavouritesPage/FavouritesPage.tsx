import React, { useEffect, useState } from 'react'
import './FavouritesPage.scss'
import axios from 'axios'
import GenericTable from '../../Shared/Table/Table'
import TableType from '../../Shared/Table/TableType'
import FavouritesConfig, {
  FavouritesData,
  FavouritesHeadCells
} from '../../Shared/Table/configs/FavouritesTableConfig'
import { useSelector } from 'react-redux'
import Footer from '../../Shared/Footer/Footer'
import FilterDropdown from '../../Shared/FilterDropdown/FilterDropdown'
import { PlacesData } from '../../Shared/Table/configs/PlacesTableConfig'
import SearchBar from '../../Shared/SearchBar/SearchBar'

function FavouritesPage() {
  const [apiData, setApiData] = useState<FavouritesData[]>([])
  const { user } = useSelector((state: any) => state.userReducer)
  const [initialData, setInitialData] = useState<FavouritesData[]>([])

  const fetchFavourites = () => {
    axios
      .get('https://localhost:5001/api/Favourite/' + user.id)
      .then((response) => {
        let structuredResponse: any = response.data.map((userPlace: any) => {
          let meanRating = 0
          if (userPlace.place.ratings && userPlace.place.ratings.length > 0) {
            userPlace.place.ratings.forEach(
              (el: any) => (meanRating += el.rate)
            )
            meanRating = meanRating / userPlace.place.ratings.length
          }
          let my_rate = null
          userPlace.place.ratings.forEach((rate: any) => {
            if (rate.appUserId === user.id) {
              my_rate = rate.rate
            }
          })
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
        setInitialData(structuredResponse)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchFavourites()
  }, [])

  let rateHandler = function ratePlace(id: number, value: number): void {
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
    <div className="FavouritesPage">
      <div className="FavouritesPage-top-row">
        <h1>My favourites places ????</h1>
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

export default FavouritesPage
