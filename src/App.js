/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { Router } from '@reach/router'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { MenuProvider } from './components/menu-context'
import LoginPage from './pages/login-page'
import ListsPage from './pages/lists-page'
import ListPage from './pages/list-page'
import ProfilePage from './pages/profile-page'
import SettingsPage from './pages/settings-page'
import { TokenContext } from './components/token-context'
import './App.css'

const App = () => {
  const { token } = React.useContext(TokenContext)

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_LETHE_API_URL,
  })

  const authLink = setContext((_, { headers }) => {
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      }
    }
    return {
      headers: {
        ...headers,
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return (
    <div className="App">
      <MenuProvider>
        <ApolloProvider client={client}>
          <Router>
            <LoginPage path="/" />
            <ListsPage path="lists" />
            <ProfilePage path="profile" />
            <SettingsPage path="settings" />
            <ListPage path="list/:listId" />
          </Router>
        </ApolloProvider>
      </MenuProvider>
    </div>
  )
}

export default App
