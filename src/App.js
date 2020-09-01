import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import { AlertProvider } from 'react-alerts-plus'
import LoginRoute from './routes/login-route'
import ListsRoute from './routes/lists-route'
import ListSettingsRoute from './routes/list-settings-route'
import ItemsRoute from './routes/items-route'
import ProfileRoute from './routes/profile-route'
import SettingsRoute from './routes/settings-route'
import AuthRoute from './routes/auth-route'
import { MenuProvider } from './components/contexts/menu-context/menu-context'
import { TokenContext } from './components/contexts/token-context/token-context'
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
        <AlertProvider>
          <ApolloProvider client={client}>
            <Router>
              <Routes>
                <AuthRoute path="/lists" component={() => <ListsRoute />} />

                <AuthRoute path="/profile" component={() => <ProfileRoute />} />

                <AuthRoute
                  path="/settings"
                  component={() => <SettingsRoute />}
                />

                <AuthRoute
                  path="/lists/settings/:listId"
                  component={() => <ListSettingsRoute />}
                />

                <AuthRoute
                  path="/lists/:listId"
                  component={() => <ItemsRoute />}
                />

                <Route path="/">
                  <LoginRoute />
                </Route>
              </Routes>
            </Router>
          </ApolloProvider>
        </AlertProvider>
      </MenuProvider>
    </div>
  )
}

export default App
