import { Popup } from '../Popup'

import MetaMask from '../../assets/svg/MetaMask.svg'

export function ConnectionPopup({ openWallet, setOpenWallet }) {
  return (
    <Popup
      open={openWallet}
      setOpen={setOpenWallet}
    >
      <h1>Wallet Connection</h1>
      <img src={MetaMask} className="App-logo" alt="logo" />
    </Popup>
  )
}