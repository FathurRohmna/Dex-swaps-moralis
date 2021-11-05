import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export function MoralisDaap({ children }) {
  const { web3, Moralis, user } = useMoralis()
  const [ walletAddress, setWalletAddress ] = useState()
  const [ chainId, setChainId ] = useState()

  console.log(walletAddress, 'wallet address')

  useEffect(() => setChainId(web3.givenProvider?.chainId))
  useEffect(
    () => setWalletAddress(web3.givenProvider?.selectedAddress || user?.get('ethAddress')),
    [web3, user]
  )

  return (
    <div>
      {children}
    </div>
  )
}
