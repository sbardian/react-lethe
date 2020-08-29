/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'

export const TokenContext = React.createContext()

export const TokenProvider = ({ children }) => {
  const [token, setToken] = React.useState(null)

  const removeToken = () => {
    setToken(undefined)
    sessionStorage.removeItem('lethe-token')
  }

  React.useEffect(() => {
    const sessionToken = sessionStorage.getItem('lethe-token')
    if (sessionToken) {
      setToken(sessionToken)
    }
  }, [])

  React.useEffect(() => {
    if (token) {
      sessionStorage.setItem('lethe-token', token)
    }
  }, [token])

  return (
    <TokenContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  )
}

TokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
