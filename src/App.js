import React from 'react'
import { Router } from '@reach/router'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { MenuProvider } from './components/menu-context'
import LoginPage from './pages/login-page'
import ListsPage from './pages/lists-page'
import ListItemsPage from './pages/list-items-page'
import ProfilePage from './pages/profile-page'
import SettingsPage from './pages/settings-page'
import { TokenContext } from './components/token-context'
import './App.css'

const App = () => {
  const { token } = React.useContext(TokenContext)

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_LETHE_API_URL,
  })

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_LETHE_WS_URL,
    options: {
      reconnect: true,
      connectionParams: {
        token,
      },
    },
  })

  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink,
  )

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

  const link = from([authLink, terminatingLink])

  const client = new ApolloClient({
    link,
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
            <ListItemsPage path="list/:listId" />
          </Router>
        </ApolloProvider>
      </MenuProvider>
    </div>
  )
}

export default App
