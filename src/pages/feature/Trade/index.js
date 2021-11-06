import { compose } from 'recompose'
import { connect } from 'react-redux'

import Trade from './Trade'
import {
  isTokenListLoaded,
  isTokenListLoading,
  tokenLists
} from '../../../selector/tokenLists-selector'
import {
  setTokenSupportList,
  setTokenSupportListSuccess,
  setFailed
} from '../../../store/tokenlists/tokenlists-actions'

const mapStateToProps = (state) => ({
  isTokenListLoaded: isTokenListLoaded(state),
  isTokenListLoading: isTokenListLoading(state),
  tokenLists: tokenLists(state)
})

const actions = {
  setTokenSupportList,
  setTokenSupportListSuccess,
  setFailed
}

export default compose(
  connect(mapStateToProps, actions)
)(Trade)
