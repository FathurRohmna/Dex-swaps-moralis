import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authenticationReducer from '../authentication/authentication-reducers'
import tokenListsReducer from '../tokenlists/tokenlists-reducers'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  authentication: authenticationReducer,
  supportToken: tokenListsReducer
})

export default createRootReducer
