import { useState } from 'react'
import { useMoralis } from 'react-moralis'

const useIncDex = () => {
  const { Moralis } = useMoralis()

  const [ tokenList, setTokenlist ] = useState()

  const getSupportedTokens = async (chain) => {
    await Moralis.initPlugins()
    Moralis.Plugins.oneInch
      .getSupportedTokens({ chain })
      .then((tokens) => setTokenlist(tokens.tokens))
  }

  return {  tokenList, getSupportedTokens }
}

export default useIncDex
