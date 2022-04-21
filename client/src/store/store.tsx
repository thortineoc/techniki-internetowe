import { createStore } from 'redux'
import reducers from './reducers'
export const store = createStore(reducers, {})

export interface IStore {
  showModalReducer: { showLoginModal: boolean; showRegistrationModal: boolean }
  isLoggedIn: boolean
}
