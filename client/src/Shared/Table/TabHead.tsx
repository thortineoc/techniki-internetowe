import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import React from 'react'
import TableType from './TableType'

interface Props {
  headerType: TableType
}

function TabHeader({headerType}:Props) {
  let types_map: Map<TableType, Array<string>> = new Map<TableType, Array<string>>([
    [TableType.PublicPlaces, ["name", "country", "city", "location", "category", "Rating"]],
    [TableType.Places, ["name", "country", "city", "location", "category", "Rating", "My rating"]],
    [TableType.Favourites, ["name", "country", "city", "location", "category", "Rating", "My Rating"]],
    [TableType.Ratings, ["name", "country", "city", "location", "category", "Rating"]]
  ]);

  return (
    <TableHead>
      <TableRow>
      { types_map.get(headerType)!.map((row) => (
        <TableCell align='center' key={row}>{row}</TableCell>
      ))}
      </TableRow>
    </TableHead>
  )
}

export default TabHeader