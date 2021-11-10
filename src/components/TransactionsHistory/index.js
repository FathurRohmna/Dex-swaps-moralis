import React from 'react'
import { useMoralis } from 'react-moralis'

import useNativeTransactions from '../../hooks/useNativeTransactions'
import { Popup } from '../Popup'

export function TransactionsHistory({open, setOpen, isAuthenticated}) {
  const { nativeTransactions, chainId } = useNativeTransactions()
  const { Moralis } = useMoralis()

  console.log(nativeTransactions)

  return (
    <Popup
      open={open}
      setOpen={setOpen}
    >
      <div className="">
        <h1>Transactions History</h1>
      </div>
      {isAuthenticated ? <div className="">List Transactions</div> : <div>Connect to Wallet Disit</div> }
    </Popup>
  )
}
