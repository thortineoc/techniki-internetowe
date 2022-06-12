import React from 'react'
import './Table.scss'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TabHeader from './TabHead'
import TabContent from './TabContent'
import TableTypeHeaders from './TableType'

interface Props {
  dataType: TableTypeHeaders
  data: Array<Array<string>>
}

function GenericTable({dataType, data}: Props) {
  console.log(dataType)
  console.log(data)
  return (
    <div>
      <div className='Table'>Hello!</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TabHeader headerType={dataType}/>
          <TabContent data={data}/>
        </Table>
      </TableContainer>
    </div>
  )
}

export default GenericTable