import React from 'react'
import { useNavigate } from '@reach/router'
import { TokenContext } from '../components/token-context'
import LoginForm from '../components/login-form'

const LoginPage = ({ navigation }) => {
  const { token } = React.useContext(TokenContext)
  const navigate = useNavigate()

  console.log('token in login page: ', token)

  if (token) {
    navigate('/lists')
  }

  return <LoginForm />
}

export default LoginPage
