import { useMoralis } from 'react-moralis'

import { Popup } from '../Popup'
import { ConnectionTypeBar } from '../ConnectionTypeBar'

import MetaMask from '../../assets/svg/MetaMask.svg'
import TrustWallet from '../../assets/svg/TrustWallet.svg'
import MathWallet from '../../assets/svg/MathWallet.svg'
import TokenPocket from '../../assets/svg/TokenPocket.svg'
import WalletConnect from '../../assets/svg/WalletConnect.svg'
import BinancheChain from '../../assets/svg/BinancheChain.svg'

const connectionWalletType = [
  { id: 1, label: 'TrustWallet', icon: TrustWallet },
  { id: 2, label: 'MathWallet', icon: MathWallet },
  { id: 3, label: 'TokenPocket', icon: TokenPocket },
  { id: 4, label: 'WalletConnection', icon: WalletConnect },
  { id: 5, label: 'Binance Chain Wallet', icon: BinancheChain }
]

export function ConnectionPopup({ openWallet, setOpenWallet }) {
  const { authenticate } = useMoralis()

  return (
    <Popup
      open={openWallet}
      setOpen={setOpenWallet}
    >
      <div className="border-b border-white py-6 px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Wallet Connection</h1>
          <p>p</p>
        </div>
      </div>
      <div className="w-full">
        <div className="p-6">
          <div className="py-1">
            <ConnectionTypeBar 
              label="Metamask" 
              icon={MetaMask} 
              onClick={() => authenticate()}
            />
          </div>
          {connectionWalletType.map(wallet => {
            return (
              <div className="py-1">
                <ConnectionTypeBar label={wallet.label} icon={wallet.icon} />
              </div>
            )
          }
          )}
        </div>
        <div className="w-full text-center mb-6">
          <p className="text-center">Learn how to connect</p>
        </div>
      </div>
    </Popup>
  )
}