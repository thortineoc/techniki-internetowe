import { InputAdornment, TextField } from '@mui/material'
import { Close, Search } from '@material-ui/icons'
import React from 'react'
import './SearchBar.scss'

export default function SearchBar({ searchTerm, setSearchTerm }: any) {
  return (
    <div className="search-bars-container">
      <TextField
        placeholder="Search by name..."
        style={{ backgroundColor: 'white', borderRadius: 3, width: '30vw' }}
        sx={{ width: 250 }}
        size="small"
        label="Name"
        value={searchTerm}
        onChange={(event: any) => setSearchTerm(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchTerm !== '' && searchTerm != null && (
                <Close
                  style={{
                    marginRight: '10px',
                    cursor: 'pointer',
                    fontSize: '20px'
                  }}
                  onClick={() => setSearchTerm('')}
                />
              )}
              <Search />
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}
