import TableType from './TableType'

export default interface TableConfiguration {
  type: TableType
  selectable: boolean
  onClick_rating?: (id: number, val: number) => void
  onClick_fav_delete?: (id: readonly number[]) => void
  data?: any
}
