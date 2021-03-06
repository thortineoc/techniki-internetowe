import { Dispatch } from 'react'
import {
  IFormError,
  IFormSuccess,
  ILoginUserAction,
  IShowModalAction,
  IUser
} from '../interfaces'

export const setLoginModal = (value: boolean) => {
  return (dispatch: Dispatch<IShowModalAction>) => {
    dispatch({
      type: 'showLoginModal',
      payload: value
    })
  }
}

export const setRegistrationModal = (value: boolean) => {
  return (dispatch: Dispatch<IShowModalAction>) => {
    dispatch({
      type: 'showRegistrationModal',
      payload: value
    })
  }
}

export const setFormError = (value: string | null) => {
  return (dispatch: Dispatch<IFormError>) => {
    dispatch({
      type: 'formError',
      payload: value
    })
  }
}
export const setFormSuccess = (value: string | null) => {
  return (dispatch: Dispatch<IFormSuccess>) => {
    dispatch({
      type: 'formSuccess',
      payload: value
    })
  }
}

export const login = (value: IUser) => {
  return (dispatch: Dispatch<ILoginUserAction>) => {
    dispatch({
      type: 'login',
      payload: value
    })
  }
}

export const logout = () => {
  return (dispatch: Dispatch<ILoginUserAction>) => {
    dispatch({
      type: 'logout',
      payload: null
    })
  }
}
