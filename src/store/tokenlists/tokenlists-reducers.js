import {
  SET_TOKEN_SUPPORT_LISTS,
  SET_TOKEN_SUPPORT_LISTS_SUCCESS,
  SET_FAILED
} from './tokenlists-constants'

const initialState = {
  isLoading: false,
  isLoaded: false,
  error: null,
  tokenlists: null
}

const tokenListsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_TOKEN_SUPPORT_LISTS:
      return {
        ...state,
        isLoading: true
      }
    case SET_TOKEN_SUPPORT_LISTS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        tokenlists: action.payload
      }
    case SET_FAILED:
      return {
        ...state,
        error: action.payload
      }
    default: 
      return state 
  }
}

export default tokenListsReducer
