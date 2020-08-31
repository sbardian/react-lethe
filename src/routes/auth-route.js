/* eslint-disable react/jsx-props-no-spreading, no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Navigate } from 'react-router-dom'

const AuthRoute = ({ component: Component, ...rest }) => {
  const token = sessionStorage.getItem('lethe-token')

  return (
    <Route {...rest} element={token ? <Component /> : <Navigate to="/" />} />
  )
}

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

export default AuthRoute
