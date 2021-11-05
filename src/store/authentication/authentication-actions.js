import { 
  SET_WALLET_ADDRESS, 
  SET_WALLET_ADDRESS_SUCCESS, 
  SET_CHAIN_ID, 
  SET_CHAIN_ID_SUCCESS, 
  AUTHENTICATION_FAILED 
} from './authentication-constants'
import { createAction } from 'redux-actions'

export const setWalletAddress = createAction(SET_WALLET_ADDRESS)
export const setWalletAddressSuccess = createAction(SET_WALLET_ADDRESS_SUCCESS)

export const setChainId = createAction(SET_CHAIN_ID)
export const setChainIdSuccess = createAction(SET_CHAIN_ID_SUCCESS)

export const authenticationFail = createAction(AUTHENTICATION_FAILED)
