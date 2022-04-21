import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'
export const store = configureStore({ reducer: reducers })

export interface IStore {
  showModalReducer: { showLoginModal: boolean; showRegistrationModal: boolean }
  isLoggedIn: boolean
}
