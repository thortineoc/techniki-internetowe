export const initialState = {
  showLoginModal: false,
  showRegistrationModal: false
}

interface showModalAction {
  type:
    | 'showLoginModal'
    | 'hideLoginModal'
    | 'showRegistrationModal'
    | 'hideRegistrationModal'
  showLoginModal: boolean
  showRegistrationModal: boolean
}

const showModalReducer = (state = initialState, action: showModalAction) => {
  switch (action.type) {
    case 'showLoginModal':
      return {
        ...state,
        showLoginModal: true
      }
    case 'hideLoginModal':
      return {
        ...state,
        showLoginModal: false
      }
    case 'showRegistrationModal':
      return {
        ...state,
        showRegistrationModal: true
      }
    case 'hideRegistrationModal':
      return {
        ...state,
        showRegistrationModal: false
      }
    default:
      return state
  }
}

export default showModalReducer
