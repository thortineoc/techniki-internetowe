import { HeaderBase } from '../HeaderBase'
import TableDataBase from '../TableDataBase'
import TableConfiguration from '../TableConfiguration'
import React, { ReactElement } from 'react'

export interface PlacesHeader extends HeaderBase {
  id: keyof PlacesData
}

export const PlacesHeadCells: readonly PlacesHeader[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'country',
    numeric: false,
    disablePadding: true,
    label: 'Country'
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: true,
    label: 'City'
  },
  {
    id: 'loc',
    numeric: false,
    disablePadding: true,
    label: 'Location'
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: true,
    label: 'Category'
  },
  {
    id: 'rating',
    numeric: false,
    disablePadding: true,
    label: 'Rating'
  },
  {
    id: 'my_rating',
    numeric: false,
    disablePadding: true,
    label: 'My rating'
  },
  {
    id: 'added_by',
    numeric: false,
    disablePadding: true,
    label: 'Added by'
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: true,
    label: 'Favourite'
  }
]

export interface PlacesData extends TableDataBase {
  my_rating: number
  added_by: string
  actions?: Array<ReactElement<any, any>>
}

export default interface PlacesConfig extends TableConfiguration {
  placesHeads: readonly PlacesHeader[]
  data: Array<PlacesData>
}
