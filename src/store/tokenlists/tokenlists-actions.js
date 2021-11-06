import {
  SET_TOKEN_SUPPORT_LISTS,
  SET_TOKEN_SUPPORT_LISTS_SUCCESS,
  SET_FAILED
} from './tokenlists-constants'
import { createAction } from 'redux-actions'

export const setTokenSupportList = createAction(SET_TOKEN_SUPPORT_LISTS)
export const setTokenSupportListSuccess = createAction(SET_TOKEN_SUPPORT_LISTS_SUCCESS)
export const setFailed = createAction(SET_FAILED)
