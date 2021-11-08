import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

import { IoMdSettings } from 'react-icons/io'
import { MdHistory } from 'react-icons/md'
import { AiOutlineArrowDown } from 'react-icons/ai'

import useIncDex from '../../../hooks/useIncDex'
import { Controllers } from '../../../components/Controllers'
import { Popup } from '../../../components/Popup'

import BnbLogo from '../../../assets/bnb.png'

const Trade = ({
  isTokenListLoaded,
  isTokenListLoading,
  tokenLists,
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
  const [reverseToken, setReverseToken] = useState(false)

  const { getSupportedTokens, getQuote } = useIncDex()
  const { Moralis } = useMoralis()

  useEffect(() => {
    // if (fromAmount) {
    //   if (reverseToken) {
    //     setCurrentTrade({ fromToken, toToken, fromAmount })
    //   } else {
    //     setCurrentTrade({ toToken, fromToken, fromAmount })
    //   }
    // }

    // if (reverseToken) {
    //   if (fromAmount) {
    //     setCurrentTrade({ fromToken, toToken, fromAmount })
    //   } else {
    //     setCurrentTrade({ toToken, fromToken, fromAmount })
    //   }
    // }

    if (fromAmount) setCurrentTrade({ fromToken, toToken, fromAmount })
    // if (reverseToken && !fromAmount) setCurrentTrade({ toToken, fromToken, fromAmount })
    // if (fromAmount && reverseToken) setCurrentTrade({ fromToken, toToken, fromAmount })
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

  const handleGetTokenSupport = async (type) => {
    setOpenPopup(true)
    setPopupType(type)
    if(!tokenLists) {
      setTokenSupportList()
      const tokenLists = await getSupportedTokens('eth')
      if (!tokenLists) {
        setFailed({
          message: 'Failed to Load Support Tokens'
        })
      } else {
        setTokenSupportListSuccess(tokenLists.tokens)
      }
    }
  }

  const onChangeHandler = (event) => setFromAmount(event.target.value)

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

  function handleReverseToken() {
    setReverseToken(!reverseToken)
    setFromToken(toToken)
    setToToken(fromToken)
    setCurrentTrade({ fromToken, toToken, fromAmount })
  }

  function convertFromWei() {
    if (quote) {
      return Moralis.Units.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals).toFixed(6)
    } else {
      return 0
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
                <button className="w-12">
                  <MdHistory size={25} />
                </button>
              </div>

              <div className="p-6">
                <div className="w-full flex bg-secondary p-4 rounded-xl mb-3">
                  <div className="w-3/4 px-1">
                    <p className="text-white text-base">From</p>
                    <Controllers.InputText
                      type="text"
                      placeholder="0.0"
                      onChange={onChangeHandler}
                      value={reverseToken ? convertFromWei() : fromAmount}
                    />
                  </div>
                  <div className="w-1/4 px-1 self-end">
                    <button onClick={() => handleGetTokenSupport('setFromToken')}>
                      {fromToken ? <span>
                        <img src={fromToken.logoURI} alt="" />
                        <p>{fromToken.symbol}</p>
                      </span> : <p>Set currect token</p> }
                    </button>
                  </div>
                </div>

                <div className="flex w-full items-center justify-center mb-3">
                  <button onClick={() => handleReverseToken()} className="p-1 bg-secondary text-primary rounded-full">
                    <AiOutlineArrowDown size={25} />
                  </button>
                </div>

                <div className="w-full flex bg-secondary p-4 rounded-xl mb-3">
                  <div className="w-3/4 px-1">
                    <p className="text-white">To</p>
                    <Controllers.InputText
                      type="text"
                      placeholder="0.0"
                      value={!reverseToken ? convertFromWei() : fromAmount}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="w-1/4 px-1 self-end">
                    <button onClick={() => handleGetTokenSupport('setToToken')}>
                      {toToken ? <span>
                        <img src={toToken.logoURI} alt="" />
                        <p>{toToken.symbol}</p>
                      </span> : <p>Set currect token</p> }
                    </button>
                  </div>
                </div>

                <div className="flex w-full items-center justify-between text-sm px-4 py-3 text-white mb-3">
                  <p>Slipage Tolerance</p>
                  <p>6.3%</p>
                </div>

                <button className="bg-primary text-center p-4 rounded-2xl w-full font-bold text-white text-lg">
                  Unlock Wallet
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
            <p>Select a token</p>
            <p>p</p>
          </div>
          <div className="w-full my-2">
            <input type="text" className="w-full px-4 py-3 rounded-xl leading-7" placeholder="Token Search Placeholder" />
          </div>
          <div className="flex justify-between mt-4 mb-2">
            <p>Token name</p>
            <p>p</p>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full">
            <button className="w-full flex px-6 items-center py-4">
              <img src={BnbLogo} alt="Bnb Logo" className="w-6 h-6 mr-4" />
              <p className="text-white text-base font-bold">BNB</p>
            </button>
          </div>
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
    </>
  )
}

export default Trade
