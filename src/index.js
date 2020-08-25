import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { TokenProvider } from './components/contexts/token-context/token-context'
import { ThemeProvider } from 'theme-ui'
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
    <TokenProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </TokenProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
