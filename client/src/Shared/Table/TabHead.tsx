import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import React from 'react'
import TableTypeHeaders from './TableType'

function TabHeader(headerType:any) {
  let types_map: Map<TableTypeHeaders, Array<string>> = new Map<TableTypeHeaders, Array<string>>([
    [TableTypeHeaders.PublicPlaces, ["name", "country", "city", "location", "category", "Rating"]],
    [TableTypeHeaders.Places, ["name", "country", "city", "location", "category", "Rating", "My rating"]],
    [TableTypeHeaders.Favourites, ["name", "country", "city", "location", "category", "Rating", "My Rating"]],
    [TableTypeHeaders.Ratings, ["name", "country", "city", "location", "category", "Rating"]]
  ]);

  return (
    <TableHead>
      <TableRow>
      { types_map.get(headerType.headerType)!.map((row) => (
        <TableCell align='center'>{row}</TableCell>
      ))}
      </TableRow>
    </TableHead>
  )
}

export default TabHeader