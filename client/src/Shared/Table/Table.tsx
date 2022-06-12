import React from 'react'
import './Table.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TabHeader from './TabHead'

function createData(
  name: string,
  country: string,
  city: string,
  location: string,
  category: string,
  added_by: string,
) {
  return { name, country, city, location, category, added_by }
}

const rows = [
  createData("name", "country", "city", "location", "category", "added_by")
]

function GenericTable(dataType: any) {
  console.log(dataType.dataType)
  return (
    <div>
      <div className='Table'>Hello!</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TabHeader headerType={dataType.dataType}/>
          {/*<TableHead>*/}
          {/*  <TableRow>*/}
          {/*    <TableCell>Dessert (100g serving)</TableCell>*/}
          {/*    <TableCell align='right'>Calories</TableCell>*/}
          {/*    <TableCell align='right'>Fat&nbsp;(g)</TableCell>*/}
          {/*    <TableCell align='right'>Carbs&nbsp;(g)</TableCell>*/}
          {/*    <TableCell align='right'>Protein&nbsp;(g)</TableCell>*/}
          {/*  </TableRow>*/}
          {/*</TableHead>*/}
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>{row.name}</TableCell>
                <TableCell align='center'>{row.country}</TableCell>
                <TableCell align='center'>{row.city}</TableCell>
                <TableCell align='center'>{row.location}</TableCell>
                <TableCell align='center'>{row.category}</TableCell>
                <TableCell align='center'>{row.added_by}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default GenericTable