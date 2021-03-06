import { combineReducers } from 'redux'
import loginModalReducer from './modalReducer'
import userReducer from './userReducer'

const reducers = combineReducers({
  showModalReducer: loginModalReducer,
  userReducer
})

export default reducers
