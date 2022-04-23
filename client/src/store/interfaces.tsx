export interface IStore {
  showModalReducer: { showLoginModal: boolean; showRegistrationModal: boolean }
  userReducer: boolean
}

export interface IShowModalAction {
  type: 'showLoginModal' | 'showRegistrationModal'
  payload: boolean
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
