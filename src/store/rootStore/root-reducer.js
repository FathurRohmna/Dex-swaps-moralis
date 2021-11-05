import { combineReducers } from 'redux'

import authenticationReducer from '../authentication/authentication-reducers'

const createRootReducer = () => combineReducers({
  authentication: authenticationReducer
})

export default createRootReducer
