import { HeaderCellBase } from './HeaderCellBase'
import TableDataBase from './TableDataBase'
import TableConfiguration from './TableConfiguration'

export interface PublicPlacesHeader extends HeaderCellBase {
  id: keyof PublicPlacesData;
}

export const PublicPlacesHeadCells: readonly PublicPlacesHeader[] = [
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
  }
]

export interface PublicPlacesData extends TableDataBase {
}

export default interface PublicPlacesConfig extends TableConfiguration {
  publicPlacesHeads: readonly PublicPlacesHeader[],
  data: Array<PublicPlacesData>
}

