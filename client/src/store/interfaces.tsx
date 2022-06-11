export interface IStore {
  showModalReducer: {
    showLoginModal: boolean
    showRegistrationModal: boolean
    setFormError: string | null
  }
  userReducer: boolean
}

export interface IShowModalAction {
  type: 'showLoginModal' | 'showRegistrationModal' | 'setFormError'
  payload: boolean | string | null
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
