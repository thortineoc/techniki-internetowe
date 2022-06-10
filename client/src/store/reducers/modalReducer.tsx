import { IShowModalAction } from '../interfaces'

export const initialState = {
  showLoginModal: false,
  showRegistrationModal: false,
  setFormError: null
}

const modalReducer = (state = initialState, action: IShowModalAction) => {
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
    case 'setFormError':
      return {
        ...state,
        setFormError: action.payload
      }
    default:
      return state
  }
}

export default modalReducer
