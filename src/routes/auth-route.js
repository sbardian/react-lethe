/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import LoginRoute from './login-route'
import { TokenContext } from '../components/contexts/token-context/token-context'

const AuthRoute = ({ as: Component, ...rest }) => {
  const { token } = React.useContext(TokenContext)

  return token ? <Component {...rest} /> : <LoginRoute />
}

AuthRoute.defaultProps = {
  as: null,
}

AuthRoute.propTypes = {
  as: PropTypes.node,
}

export default AuthRoute
