import { useState } from 'react'
import { useMoralis } from 'react-moralis'

const useIncDex = () => {
  const { Moralis } = useMoralis()

  const getSupportedTokens = async (chain) => {
    await Moralis.initPlugins()
    const tokenLists =  await Moralis.Plugins.oneInch.getSupportedTokens({ chain })

    return tokenLists
  }

  return {  getSupportedTokens }
}

export default useIncDex
