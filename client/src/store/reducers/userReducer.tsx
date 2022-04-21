import { ILoginUserAction } from '../interfaces'

export const initialState = {
  user: null
}

const userReducer = (state = initialState, action: ILoginUserAction) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload
      }
    case 'logout':
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

export default userReducer
