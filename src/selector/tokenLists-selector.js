export const isTokenListLoading = (state) => state.supportToken.isLoading
export const isTokenListLoaded = (state) => state.supportToken.isLoaded

export const tokenLists = (state) => {
  const allTokenLists = state.supportToken?.tokenlists
  if (allTokenLists) {
    const tokenLists = Object.entries(allTokenLists).slice(0, 6).map(token => token[1])
    console.log(tokenLists, 'selectors')

    return tokenLists
  } else {
    return null
  }
}
