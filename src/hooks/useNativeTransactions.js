import { useEffect, useState } from 'react'
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis'

const useNativeTransactions = (options) => {
  const { account } = useMoralisWeb3Api()
  const chainId = "0x38"

  const [nativeTransactions, setNativeTransactions] = useState([])

  const {
    fetch: getNativeTransactions,
    data,
    error,
    isLoading
  } = useMoralisWeb3ApiCall(account.getTransactions, { chain: chainId, ...options })

  useEffect(() => {
    data && setNativeTransactions(data?.result)
  }, [data])

  return { getNativeTransactions, nativeTransactions, chainId, error, isLoading }

}

export default useNativeTransactions
 