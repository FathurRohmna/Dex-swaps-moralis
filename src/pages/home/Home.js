import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="relative block w-full">
      <div className="w-full text-white py-10 bg-bgsecondary min-h-screen h-max flex text-center justify-center">
        <div className="px-6">
          <h1 className="text-4xl text-primary font-extrabold">Welcome to Comodo Coin</h1>
          <p className="text-lg font-semibold">Make your perfect life</p>

          <a className="my-12 block underline text-primary ">
            <Link to="/app/trade">Daap Comodo Coin</Link>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
