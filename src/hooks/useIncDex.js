import { useMoralis } from 'react-moralis'

const useIncDex = () => {
  const { Moralis } = useMoralis()

  const getSupportedTokens = async (chain) => {
    await Moralis.initPlugins()
    const tokenLists =  await Moralis.Plugins.oneInch.getSupportedTokens({ chain })

    return tokenLists
  }

  const getQuote = async (params) => {
    const quote = await Moralis.Plugins.oneInch.quote({
      chain: 'eth',
      fromTokenAddress: params.fromToken.address,
      toTokenAddress: params.toToken.address,
      amount: Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString()
    })

    return quote
  } 

  return {  getSupportedTokens, getQuote }
}

export default useIncDex
