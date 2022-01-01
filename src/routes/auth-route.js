/* eslint-disable react/jsx-props-no-spreading, no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }) => {
  const token = sessionStorage.getItem('lethe-token')

  return token ? children : <Navigate to="/" />
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthRoute
