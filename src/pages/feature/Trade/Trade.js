import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'

import { IoMdSettings } from 'react-icons/io'
import { MdHistory } from 'react-icons/md'
import { AiOutlineArrowDown } from 'react-icons/ai'

import useIncDex from '../../../hooks/useIncDex'
import { Controllers } from '../../../components/Controllers'

const Trade = ({
  isTokenListLoaded,
  isTokenListLoading,
  tokenLists,
  setTokenSupportList,
  setTokenSupportListSuccess,
  setFailed
}) => {
  const { getSupportedTokens } = useIncDex()

  const handleGetTokenSupport = async () => {
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

  console.log(tokenLists, 'okenLists')

  return (
    <div className="relative w-full">
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
                    />
                  </div>
                  <div className="w-1/4 px-1 self-end">
                    <button onClick={() => handleGetTokenSupport()}>
                      Token
                    </button>
                  </div>
                </div>

                <div className="flex w-full items-center justify-center mb-3">
                  <button className="p-1 bg-secondary text-primary rounded-full">
                    <AiOutlineArrowDown size={25} />
                  </button>
                </div>

                <div className="w-full flex bg-secondary p-4 rounded-xl mb-3">
                  <div className="w-3/4 px-1">
                    <p className="text-white">To</p>
                    <Controllers.InputText
                      type="text"
                      placeholder="0.0"
                    />
                  </div>
                  <div className="w-1/4 px-1 self-end">
                    <p>Hello</p>
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
  )
}

export default Trade
