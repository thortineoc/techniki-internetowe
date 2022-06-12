import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import React from 'react'
import TableBody from '@mui/material/TableBody'

interface Props {
  data: Array<Array<string>>
}

function TabContent({ data }: Props) {
  return (
    <TableBody>
      {
        data.map((row) => (
          <TableRow
            key={row[0]}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {
              row.map((el,i) => {
                return <TableCell align='center' key={i}>{el}</TableCell>
              })
            }
          </TableRow>
        ))}
    </TableBody>
  )
}

export default TabContent