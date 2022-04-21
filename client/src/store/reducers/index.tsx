import { combineReducers } from 'redux'
import loginModalReducer from './showModalReducer'

const reducers = combineReducers({ showModalReducer: loginModalReducer })

export default reducers
