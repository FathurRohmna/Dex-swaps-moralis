import { createStore } from 'redux'

import createRootReducer from './root-reducer'

const configureStore = () => {
  const store = createStore(
    createRootReducer(),
  )

  return store
}

export default configureStore
