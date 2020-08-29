/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { TokenContext } from '../components/contexts/token-context/token-context'

const AuthRoute = ({ component: Component, ...rest }) => {
  const { token } = React.useContext(TokenContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

AuthRoute.propTypes = {
  component: PropTypes.node.isRequired,
}

export default AuthRoute
