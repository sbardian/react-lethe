/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { useNavigate } from '@reach/router'
import { TokenContext } from '../components/token-context'
import LoginForm from '../components/login-form'

const LoginPage = ({ navigation }) => {
  const { token } = React.useContext(TokenContext)
  const navigate = useNavigate()

  if (token) {
    navigate('/home')
  }

  return <LoginForm />
}

export default LoginPage
