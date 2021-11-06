import { createStore, compose } from 'redux'
import { createBrowserHistory } from 'history'

import createRootReducer from './root-reducer'

export const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => {
  const store = createStore(
    createRootReducer(history),
    composeEnhancers()
  )

  return store
}

export default configureStore
