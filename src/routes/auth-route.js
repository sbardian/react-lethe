import React from 'react'
import LoginRoute from './login-route'
import { TokenContext } from '../components/contexts/token-context/token-context'

const AuthRoute = ({ as: Component, ...rest }) => {
  const { token } = React.useContext(TokenContext)

  return token ? <Component {...rest} /> : <LoginRoute />
}

export default AuthRoute
