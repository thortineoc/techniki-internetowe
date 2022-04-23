import { IShowModalAction } from '../interfaces'

export const initialState = {
  showLoginModal: false,
  showRegistrationModal: false
}

const showModalReducer = (state = initialState, action: IShowModalAction) => {
  switch (action.type) {
    case 'showLoginModal':
      return {
        ...state,
        showLoginModal: action.payload
      }
    case 'showRegistrationModal':
      return {
        ...state,
        showRegistrationModal: action.payload
      }
    default:
      return state
  }
}

export default showModalReducer
