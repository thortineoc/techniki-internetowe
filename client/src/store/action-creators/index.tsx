import { Dispatch } from 'react'
import { showModalAction } from '../reducers/showModalReducer'

export const setLoginModal = (value: boolean) => {
  return (dispatch: Dispatch<showModalAction>) => {
    dispatch({
      type: 'showLoginModal',
      payload: value
    })
  }
}
