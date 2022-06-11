export interface IStore {
  showModalReducer: {
    showLoginModal: boolean
    showRegistrationModal: boolean
    formError: string | null
    formSuccess: string | null
  }
  userReducer: boolean
}

export interface IShowModalAction {
  type: 'showLoginModal' | 'showRegistrationModal' | 'formError' | 'formSuccess'
  payload: boolean | string | null
}

export interface IFormError {
  type: 'formError'
  payload: string | null
}

export interface IFormSuccess {
  type: 'formSuccess'
  payload: string | null
}

export interface IUser {
  id: number
  username: string
  email: string
}

export interface ILoginUserAction {
  type: 'login' | 'logout'
  payload: IUser | null
}
