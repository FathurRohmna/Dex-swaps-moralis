import { useMoralis } from 'react-moralis'

const useIncDex = () => {
  const { Moralis } = useMoralis()

  const getSupportedTokens = async (chain) => {
    await Moralis.initPlugins()
    const tokenLists =  await Moralis.Plugins.oneInch.getSupportedTokens({ chain })
    console.log(tokenLists)

    return tokenLists
  }

  const getQuote = async (params) => {
    const quote = await Moralis.Plugins.oneInch.quote({
      chain: 'bsc',
      fromTokenAddress: params.fromToken.address,
      toTokenAddress: params.toToken.address,
      amount: Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString()
    })
    const estimatedValue = Moralis.Units.FromWei(quote.toTokenAmount, quote.toToken.decimals).toFixed(6)

    return estimatedValue
  }

  async function trySwap(params) {
    const { fromToken, fromAmount, walletAddress } = params
    const amount = Moralis.Units.Token(fromAmount, fromToken.decimals).toString()
    if (fromToken.address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      await Moralis.Plugins.oneInch
        .hasAllowance({
          chain: 'bsc',
          fromTokenAddress: fromToken.address,
          fromAddress: walletAddress,
          amount
        })
        .then(async (allowance) => {
          if (!allowance) {
            await Moralis.Plugins.oneInch.approve({
              chain: 'bsc',
              tokenAddress: fromToken.address,
              fromAddress: walletAddress
            })
          }
        })
        .catch((e) => console.log(e.message))
    }

    await doSwap(params) 
      .then((receipt) => {
        if (receipt.statusCode !== 400) {
          console.log("Swap Complete")
        }
        console.log(receipt)
      })
      .catch((e) => console.log(e.message))
  }

  async function doSwap(params) {
    return await Moralis.Plugins.onInch.swap({
      chain: 'bsc',
      fromTokenAddress: params.fromToken.address,
      toTokenAddress: params.toToken.address,
      amount: params.fromAmount,
      fromAddress: params.walletAddress,
      slippage: 1,
    })
  }

  return {  getSupportedTokens, getQuote, trySwap }
}

export default useIncDex
