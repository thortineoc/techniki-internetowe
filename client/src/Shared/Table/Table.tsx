import React, { useEffect, useState } from 'react'
import './Table.scss'

import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import { visuallyHidden } from '@mui/utils'
import PublicPlacesConfig, {
  PublicPlacesHeader
} from './configs/PublicPlacesTableConfig'
import TableConfiguration from './TableConfiguration'
import TableDataBase from './TableDataBase'
import TableType from './TableType'
import PlacesConfig, { PlacesHeader } from './configs/PlacesTableConfig'
import { HeaderBase } from './HeaderBase'
import FavouritesConfig, {
  FavouritesHeader
} from './configs/FavouritesTableConfig'
import RatingConfig, { RatingHeader } from './configs/RatingsTableConfig'
import { Rating } from '@mui/material'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableDataBase
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  headers: readonly HeaderBase[]
  type: TableType
  selectable: boolean
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headers,
    type,
    selectable
  } = props
  const createSortHandler =
    (property: keyof TableDataBase) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  let headerCells: Array<HeaderBase>
  if (type === TableType.PublicPlaces) {
    headerCells = headers as Array<PublicPlacesHeader>
  } else if (type === TableType.Places) {
    headerCells = headers as Array<PlacesHeader>
  } else if (type === TableType.Favourites) {
    headerCells = headers as Array<FavouritesHeader>
  } else if (type === TableType.Ratings) {
    headerCells = headers as Array<RatingHeader>
  } else {
    headerCells = [] as Array<HeaderBase>
    console.error('header type error')
  }

  return (
    <TableHead>
      <TableRow>
        {selectable ? (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all'
              }}
            />
          </TableCell>
        ) : null}

        {headerCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

interface EnhancedTableToolbarProps {
  numSelected: number
  selected: readonly number[]
  onClick_fav_delete?: (id: readonly number[]) => void
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, selected, onClick_fav_delete, setSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div">
          Places
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon
              onClick={() => {
                console.log('Removig favs: ' + selected)
                if (selected && onClick_fav_delete) {
                  onClick_fav_delete(selected)
                  let newSelected: readonly number[] = []
                  setSelected(newSelected)
                } else {
                  console.error(
                    'Selected or fav delete handler is undefined or null'
                  )
                }
              }}
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>{/*<FilterListIcon />*/}</IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export default function GenericTable(config: TableConfiguration) {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof TableDataBase>('loc')
  const [selected, setSelected] = React.useState<readonly number[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const [dataState, setDataState] = useState([])

  useEffect(() => {
    console.log(config)
    console.log('TABLEEE')
    setDataState(config.data)
  }, [config])

  useEffect(() => {
    console.log('daneeee')
    console.log(dataState)
  }, [dataState])

  let data: Array<TableDataBase>
  let headers
  if (config.type === TableType.PublicPlaces) {
    let tmp = config as PublicPlacesConfig
    data = tmp.data
    headers = tmp.publicPlacesHeads
  } else if (config.type === TableType.Places) {
    let tmp = config as PlacesConfig
    data = tmp.data
    headers = tmp.placesHeads
  } else if (config.type === TableType.Favourites) {
    let tmp = config as FavouritesConfig
    data = tmp.data
    headers = tmp.favouritesHeads
  } else if (config.type === TableType.Ratings) {
    let tmp = config as RatingConfig
    data = tmp.data
    headers = tmp.ratingHeads
  } else {
    data = []
    headers = []
    console.error('Error state: unknown table type!')
  }

  let rows = data

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableDataBase
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    if (!config.selectable){
      return
    }
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  let fields = [
    'name',
    'country',
    'city',
    'loc',
    'location',
    'category',
    'rating',
    'my_rating',
    'actions'
  ]

  return (
    <Box sx={{ width: '80vw' }} className="TableWrapper">
      <Paper sx={{ width: '80vw', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          onClick_fav_delete={config.onClick_fav_delete}
          setSelected={setSelected}
        />
        <TableContainer>
          <Table sx={{ width: '80vw' }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              type={config.type}
              headers={headers}
              selectable={config.selectable}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}>
                      {config.selectable ? (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId
                            }}
                          />
                        </TableCell>
                      ) : null}
                      {Object.getOwnPropertyNames(row).map((item) => {
                        if (!fields.includes(item.toLowerCase())) {
                          return []
                        }
                        type ObjectKey = keyof typeof row
                        const key = item as ObjectKey
                        if (item === 'my_rating') {
                          return (
                            <TableCell key={item} align="center">
                              <Rating
                                name="simple-controlled"
                                value={Number(row[key] ?? 0)}
                                precision={1}
                                onChange={(event, newValue) => {
                                  console.log(row)
                                  if (newValue && config.onClick_rating) {
                                    config.onClick_rating(row.placeId, newValue)
                                  } else {
                                    console.error(
                                      'Rating new value is absent or handler is null'
                                    )
                                  }
                                }}
                              />
                            </TableCell>
                          )
                        } else if (item === 'rating') {
                          let val: number = Number(row[key])
                          return (
                            <TableCell key={item} align="center">
                              <Rating
                                name="read-only"
                                precision={0.5}
                                value={val}
                                readOnly
                              />
                            </TableCell>
                          )
                        }

                        return (
                          <TableCell align="center" key={item}>
                            {row[key]}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
