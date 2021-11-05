import { Routes, Route, Link } from 'react-router-dom'
import { useMoralis } from 'react-moralis'

import Trade from './Trade/Trade'
import Farms from './Farms/Farms'
import Community from './Community/Community'
import ComodoContract from './ComodoContract/ComodoContract'
import PriceCart from './PriceCart/PriceCart'

function MoralisDaap({ children }) {

}

export function Feature() {
  return (
    <div className="relative block w-full">
      <header className="fixed top-0 left-0 w-full h-16 bg-gray-900 border-b-2 border-gray-800 z-50">
      
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
        <div className="px-4 py-12">
          <Routes>
            <Route path="/trade" element={<Trade />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/community" element={<Community />} />
            <Route path="/comodo-contract" element={<ComodoContract />} />
            <Route path="/price-cart" element={<PriceCart />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
