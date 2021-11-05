import React from 'react'
import ReactDOM from 'react-dom'
import { MoralisProvider } from 'react-moralis'

import './styles/index.css'
import './styles/main.css'
import App from './app/App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider 
      appId="NdpE3ntjpOPgpH6iIBCVwbLQDcvcH0Yqf6dFy3IJ" 
      serverUrl="https://xsdgea7ces22.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
