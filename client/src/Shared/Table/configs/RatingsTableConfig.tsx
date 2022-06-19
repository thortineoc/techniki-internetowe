import { HeaderBase } from '../HeaderBase'
import TableDataBase from '../TableDataBase'
import TableConfiguration from '../TableConfiguration'

export interface RatingHeader extends HeaderBase {
  id: keyof RatingData;
}

export const RatingHeadCells: readonly RatingHeader[] = [
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
    label: 'Rating'
  }
]

export interface RatingData extends TableDataBase {
  my_rating: number
}

export default interface RatingConfig extends TableConfiguration {
  ratingHeads: readonly RatingHeader[],
  data: Array<RatingData>
}

