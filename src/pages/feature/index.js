import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useMoralis } from 'react-moralis'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { setWalletAddressSuccess } from '../../store/authentication/authentication-actions'
import { walletAddress } from '../../selector/authentication-selector'

import { MdMenuOpen, MdMenu } from 'react-icons/md'

import Trade from './Trade'
import Farms from './Farms/Farms'
import Community from './Community/Community'
import ComodoContract from './ComodoContract/ComodoContract'
import PriceCart from './PriceCart/PriceCart'

import { ConnectionPopup } from '../../components/ConnectionPopup'
import { Popup } from '../../components/Popup'

import LogoHeader from '../../assets/logo-header.png'

const mapStateToProps = (state) => ({
  walletAddress: walletAddress(state)
})

const actions = {
  setWalletAddressSuccess
}

const Feature = ({ walletAddress, setWalletAddressSuccess }) => {
  const [openWalletConnection, setOpenWalletConnection] = useState(false)
  const [openWalletAddress, setOpenWalletAddress] = useState(false)

  const { web3, user, isAuthenticated, logout, isWeb3Enabled, isWeb3EnableLoading, enableWeb3, Moralis } = useMoralis()

  useEffect(() => {
    if (isAuthenticated) {
      setWalletAddressSuccess(web3.givenProvider?.selectedAddress || user?.get('ethAddress'))
      setOpenWalletAddress(!openWalletAddress)
    }

  }, [user, web3])

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
  }, [isAuthenticated, isWeb3Enabled]);

  return (
      <div className="relative block w-full">
        <header className="fixed top-0 left-0 w-full box-border h-16 bg-gray-900 border-b-2 border-gray-800 z-40">
          <div className="relative w-full flex justify-between h-full items-center px-4">
            <div className="text-primary flex items-center">
              <div className="mr-2">
                <MdMenuOpen size={25} />
              </div>
              <img src={LogoHeader} alt="Image Here" className="h-8 w-auto ml-2" />
            </div>
            {isAuthenticated ? <button className="px-4 py-1 rounded-full bg-primary text-white font-bold w-32 text-lg overflow-hidden box-border" onClick={() => setOpenWalletAddress(true)}>{walletAddress ? walletAddress : 'Loading....'}</button> : <button
              onClick={() => setOpenWalletConnection(true)}
              className="px-4 py-1 rounded-full bg-primary text-white font-bold text-lg">
              Connect
            </button>}
          </div>
        </header>
        <nav className="bg-white flex flex-wrap items-center justify-between fixed w-60 z-10 px-2">
          <div className="w-full mx-auto px-0 flex flex-wrap items-center justify-between">
            <div className="bg-bgsecondary border-r-2 border-gray-800 absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden min-h-screen h-full items-center flex-1">
              <div className="relative w-full mt-24 z-50 px-3">
                <ul className="text-white">
                  <li>
                    <Link to="/app/trade">Trade</Link>
                  </li>
                  <li>
                    <Link to="/app/farms">Farms</Link>
                  </li>
                  <li>
                    <Link to="/app/community">Community</Link>
                  </li>
                  <li>
                    <Link to="/app/comodo-contract">Comodo Contracts</Link>
                  </li>
                  <li>
                    <Link to="/app/price-cart">Price Cart</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="relative md:ml-60 bg-bgprimary h-full min-h-screen">
          <div className="px-4 py-14">
            <Routes>
              <Route path="/trade" element={<Trade />} />
              <Route path="/farms" element={<Farms />} />
              <Route path="/community" element={<Community />} />
              <Route path="/comodo-contract" element={<ComodoContract />} />
              <Route path="/price-cart" element={<PriceCart />} />
            </Routes>
          </div>
        </div>
        <ConnectionPopup
          openWallet={openWalletConnection}
          setOpenWallet={setOpenWalletConnection}
        />
        <Popup
          open={openWalletAddress}
          setOpen={setOpenWalletAddress}
        >
          <div className="w-full">
            <div className="w-full">
              <div className="border-b border-white py-6 px-8">
                <h1 className="text-xl font-semibold text-white">Wallet Address</h1>
              </div>
            </div>
            <div className="w-full py-6 px-8 box-border overflow-hidden">
              <h1 className="text-xs text-primary my-4">{walletAddress}</h1>
              <button className="px-3 py-2 text-primary font-semibold border-primary border rounded-lg" onClick={() => logout()}>Logout</button>
            </div>
          </div>
        </Popup>
      </div>
  )
}

export default compose(
  connect(mapStateToProps, actions)
)(Feature)
