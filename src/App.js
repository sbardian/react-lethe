/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { Router } from '@reach/router'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { TokenProvider } from './components/token-context'
import { MenuProvider } from './components/menu-context'
import LoginPage from './pages/login-page'
import ListsPage from './pages/lists-page'
import './App.css'

const App = () => {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_LETHE_API_URL,
    cache: new InMemoryCache(),
  })

  return (
    <div className="App">
      <TokenProvider>
        <MenuProvider>
          <ApolloProvider client={client}>
            <Router>
              <LoginPage path="/" />
              <ListsPage path="/lists" />
            </Router>
          </ApolloProvider>
        </MenuProvider>
      </TokenProvider>
    </div>
  )
}

export default App
