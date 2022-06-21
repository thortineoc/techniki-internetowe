import { Button, IconButton, Menu, TextField } from '@mui/material'
import { FilterList } from '@material-ui/icons'
import React from 'react'
import './FilterDropdown.scss'

export default function FilterDropdown({
  setCategoryFilter,
  setCountryFilter,
  setCityFilter,
  setLocationFilter,
  categoryFilter,
  countryFilter,
  cityFilter,
  locationFilter,
  setUserFilter,
  userFilter
}: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const clearFilter = () => {
    setCategoryFilter('')
    setCountryFilter('')
    setCityFilter('')
    setLocationFilter('')
    setUserFilter('')
  }

  const isFilterSet = (): boolean => {
    console.log(countryFilter)
    console.log(countryFilter != '')
    console.log(
      countryFilter != '' ||
        locationFilter != '' ||
        cityFilter != '' ||
        categoryFilter != '' ||
        userFilter != ''
    )
    return (
      countryFilter != '' ||
      locationFilter != '' ||
      cityFilter != '' ||
      categoryFilter != '' ||
      userFilter != ''
    )
  }

  return (
    <>
      <IconButton
        aria-label="filter"
        className="filter-icon"
        onClick={handleClick}>
        <FilterList
          className={
            isFilterSet() ? 'filter-icon-active' : 'filter-icon-inactive'
          }
        />
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
            height: '372px',
            padding: '10px 10px 0 10px',
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
        {setUserFilter ? (
          <div className="list-item">
            <TextField
              placeholder="Search by user..."
              sx={{ width: 250 }}
              size="small"
              label="User"
              name="User"
              onChange={(event: any) => setUserFilter(event.target.value)}
              value={userFilter}
            />
          </div>
        ) : (
          []
        )}
        <div className="list-item">
          <Button onClick={() => clearFilter()}>Clear</Button>
        </div>
      </Menu>
    </>
  )
}
