import { 
  SET_WALLET_ADDRESS, 
  SET_WALLET_ADDRESS_SUCCESS, 
  SET_CHAIN_ID, 
  SET_CHAIN_ID_SUCCESS, 
  AUTHENTICATION_FAILED 
} from './authentication-constants'

const initState = {
  isLoading: false,
  isLoaded: false,
  error: null,
  walletAddress: null,
  chainId: null,
}

const authenticationReducer = (state = initState, action) => {
  switch(action.type) {
    case SET_WALLET_ADDRESS || SET_CHAIN_ID:
      return {
        ...state,
        isLoading: true
      }
    case SET_WALLET_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        walletAddress: action.payload
      }
    case SET_CHAIN_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        chainId: action.payload
      }
    case AUTHENTICATION_FAILED:
      return {
        ...state,
        error: action.payload
      }
    default: 
      return state 
  }
}

export default authenticationReducer
