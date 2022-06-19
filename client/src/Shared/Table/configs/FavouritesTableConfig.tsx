import { HeaderBase } from '../HeaderBase'
import TableDataBase from '../TableDataBase'
import TableConfiguration from '../TableConfiguration'

export interface FavouritesHeader extends HeaderBase{
  id: keyof FavouritesData;
}

export const FavouritesHeadCells: readonly FavouritesHeader[] = [
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
  }
]

export interface FavouritesData extends TableDataBase{
  my_rating: number
}

export default interface FavouritesConfig extends TableConfiguration{
  favouritesHeads: readonly FavouritesHeader[],
  data: Array<FavouritesData>
}
