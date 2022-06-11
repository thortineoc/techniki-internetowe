import { IShowModalAction } from '../interfaces'

export const initialState = {
  showLoginModal: false,
  showRegistrationModal: false,
  formError: null,
  formSuccess: null
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
    case 'formError':
      return {
        ...state,
        formError: action.payload
      }
    case 'formSuccess':
      return {
        ...state,
        formSuccess: action.payload
      }
    default:
      return state
  }
}

export default modalReducer
