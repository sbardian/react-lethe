/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { Router } from '@reach/router'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { TokenProvider } from './components/token-context'
import LoginPage from './pages/login-page'
import HomePage from './pages/home-page'
import './App.css'

const App = () => {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_LETHE_API_URL,
    cache: new InMemoryCache(),
  })

  return (
    <div className="App">
      <TokenProvider>
        <ApolloProvider client={client}>
          <Router>
            <LoginPage path="/" />
            <HomePage path="/home" />
          </Router>
        </ApolloProvider>
      </TokenProvider>
    </div>
  )
}

export default App
