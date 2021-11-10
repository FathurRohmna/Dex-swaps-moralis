import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

import { IoMdSettings } from 'react-icons/io'
import { MdHistory } from 'react-icons/md'
import { AiOutlineArrowDown } from 'react-icons/ai'

import useIncDex from '../../../hooks/useIncDex'
import { Controllers } from '../../../components/Controllers'
import { Popup } from '../../../components/Popup'
import { ConnectionPopup } from '../../../components/ConnectionPopup'
import { TransactionsHistory } from '../../../components/TransactionsHistory'

const Trade = ({
  isTokenListLoaded,
  isTokenListLoading,
  tokenLists,
  walletAddress,
  setTokenSupportList,
  setTokenSupportListSuccess,
  setFailed
}) => {
  const [openPopup, setOpenPopup] = useState(false)
  const [openWalletConnection, setOpenWalletConnection] = useState(false)
  const [popupType, setPopupType] = useState()
  const [fromToken, setFromToken] = useState()
  const [toToken, setToToken] = useState()
  const [fromAmount, setFromAmount] = useState()
  const [quote, setQuote] = useState()
  const [currentTrade, setCurrentTrade] = useState()
  const [changeEstimatedInput, setChangeEstimatedInput] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)

  const { getSupportedTokens, getQuote, trySwap } = useIncDex()
  const { isAuthenticated } = useMoralis()

  useEffect(() => {
    if (fromAmount && fromToken && toToken) setCurrentTrade({ fromToken, toToken, fromAmount })
  }, [toToken, fromToken, fromAmount])

  useEffect( () => {
    async function handleGetQuote() {
      if (currentTrade) {
        const getMoraQuote = await getQuote(currentTrade)

        setQuote(getMoraQuote)
      }
    }

    handleGetQuote()
  }, [currentTrade])

  useEffect(() => {
    if (walletAddress) {
      setCurrentTrade({
        ...currentTrade,
        walletAddress: walletAddress
      })
    }
  }, [])

  const handleGetTokenSupport = async (type) => {
    setOpenPopup(true)
    setPopupType(type)
    if(!tokenLists) {
      setTokenSupportList()
      const tokenLists = await getSupportedTokens('bsc')
      if (!tokenLists) {
        setFailed({
          message: 'Failed to Load Support Tokens'
        })
      } else {
        setTokenSupportListSuccess(tokenLists.tokens)
      }
    }
  }

  const onChangeHandler = (event) => {
    const targetName = event.target.name

    if (targetName === 'estimated') {
      setChangeEstimatedInput(true)
    } else {
      setChangeEstimatedInput(false)
    }

    setFromAmount(event.target.value)
  }

  const handleQuoteTokenType = (address) => {
    if (popupType === 'setFromToken') {
      setFromToken(address)
    }
    if (popupType === 'setToToken') {
      setToToken(address)
    }
  }

  function disabledToken(address) {
    if (fromToken?.address === address || toToken?.address === address) {
      return true
    }
    return false
  }
  
  const handleSwapToken = () => {
    if (isAuthenticated) {
      trySwap(currentTrade)
    } else {
      setOpenWalletConnection(true)
    }
  }

  return (
    <>
      <div className="relative w-full h-full">
      <div className="flex flex-col py-8 justify-center items-center w-full min-h-90">
        <div className="flex mb-8 p-2">
          <div className="px-6 py-2 bg-primary rounded-l-full">
            <h1 className="text-center font-black text-white text-lg">Swap</h1>
          </div>
          <div className="px-6 py-2 bg-primary rounded-r-full">
            <h1 className="text-center font-black text-white text-lg">Liquidity</h1>
          </div>
        </div>

          <div className="max-w-md w-full bg-bgsecondary rounded-3xl box-border">
            <div className="relative w-full font-semibold">

              <div className="w-full p-6 flex flex-1 items-center border-b border-gray-700 text-primary box-border align-baseline">
                <div className="flex-1">
                  <h1 className="mb-2 font-black text-white text-xl">Exchange</h1>
                  <p className="text-md">Trade tokens in an instant.</p>
                </div>
                <button className="w-12">
                  <IoMdSettings size={25} />
                </button>
                <button 
                  onClick={() => setOpenHistory(true)}
                  className="w-12">
                  <MdHistory size={25} />
                </button>
              </div>

              <div className="p-6">
                <div className="w-full flex flex-1 bg-secondary p-4 rounded-xl mb-3">
                  <div className="flex-1 px-1">
                    <p className="text-white text-base">From</p>
                    {changeEstimatedInput ? <p>(Estimated)</p> : ''}
                    <Controllers.InputText
                      type="text"
                      name="amount"
                      placeholder="0.0"
                      onChange={onChangeHandler}
                      value={fromAmount}
                    />
                  </div>
                  <div className="px-1 self-end">
                    <button onClick={() => handleGetTokenSupport('setFromToken')}>
                      {fromToken ? <span className="flex items-center">
                        <img src={fromToken.logoURI} className="w-8 h-8" alt="" />
                        <p className="px-1 text-white font-semibold">{fromToken.symbol}</p>
                      </span> : <p className="text-white font-semibold">Select a currency</p> }
                    </button>
                  </div>
                </div>

                <div className="flex w-full items-center justify-center mb-3">
                  <button className="p-1 bg-secondary text-primary rounded-full">
                    <AiOutlineArrowDown size={25} />
                  </button>
                </div>

                <div className="w-full flex flex-1 bg-secondary p-4 rounded-xl mb-3">
                  <div className="flex-1 px-1">
                    <p className="text-white">To</p>
                    {!changeEstimatedInput ? <p>(Estimated)</p> : ''}
                    <Controllers.InputText
                      type="text"
                      name="estimated"
                      placeholder="0.0"
                      value={quote ? quote  : ''}
                      readOnly
                    />
                  </div>
                  <div className="px-1 self-end">
                    <button onClick={() => handleGetTokenSupport('setToToken')}>
                      {toToken ? <span className="flex items-center">
                        <img src={toToken.logoURI} className="w-8 h-8" alt="" />
                        <p className="px-1 text-white font-semibold">{toToken.symbol}</p>
                      </span> : <p className="text-white font-semibold">Set currect token</p> }
                    </button>
                  </div>
                </div>

                <button onClick={handleSwapToken} className="bg-primary text-center p-4 rounded-2xl w-full font-bold text-white text-lg">
                  {!isAuthenticated ? "Unlock Wallet" : "Swaps"}
                </button>
              </div>

            </div>
          </div>
      </div>
    </div>
    <Popup
      open={openPopup}
      setOpen={setOpenPopup}
    >
      <div className="w-full">
        <div className="border-b border-gray-600 px-6 py-4">
          <div className="flex justify-between mb-4">
            <p className="text-white text-lg font-semibold">Select a token</p>
            <p>p</p>
          </div>
          <div className="w-full my-2">
            <input type="text" className="w-full px-4 py-3 rounded-xl leading-7 bg-transparent border border-primary focus:outline-none" placeholder="Token Search Placeholder" />
          </div>
          <div className="flex justify-between mt-4 mb-2">
            <p className="text-white">Token name</p>
            <p>p</p>
          </div>
        </div>
        <div className="w-full">
          {isTokenListLoading && <h1>Loading  Token .......</h1>}
          {tokenLists && tokenLists.map(token => {
            return (
              <div className="w-full" key={token.address}>
                <button disabled={disabledToken(token.address)} onClick={() => handleQuoteTokenType(token)} className="w-full flex px-6 items-center py-4">
                  <img src={token.logoURI} alt="Bnb Logo" className="w-6 h-6 mr-4" />
                  <p className="text-white text-base font-bold">{token.symbol}</p>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </Popup>
    <ConnectionPopup
      openWallet={openWalletConnection}
      setOpenWallet={setOpenWalletConnection}
    />
    <TransactionsHistory
      open={openHistory}
      setOpen={setOpenHistory}
      isAuthenticated={isAuthenticated}
    />
    </>
  )
}

export default Trade
