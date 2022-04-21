export const initialState = {
  showLoginModal: false,
  showRegistrationModal: false
}

export interface showModalAction {
  type: 'showLoginModal' | 'showRegistrationModal'
  payload: boolean
}

const showModalReducer = (state = initialState, action: showModalAction) => {
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
