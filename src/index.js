import React from 'react'
import ReactDOM from 'react-dom'
import { MoralisProvider } from 'react-moralis'
import { Provider } from 'react-redux'

import configureStore from './store/rootStore/configure-store'

import './styles/index.css'
import './styles/main.css'
import App from './app/App'
import reportWebVitals from './reportWebVitals'

const APP_ID = "NdpE3ntjpOPgpH6iIBCVwbLQDcvcH0Yqf6dFy3IJ"
const SERVER_URL = "https://xsdgea7ces22.usemoralis.com:2053/server"

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider 
      appId={APP_ID}
      serverUrl={SERVER_URL}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
