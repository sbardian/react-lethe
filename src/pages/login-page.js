import React from 'react'
import { useNavigate } from '@reach/router'
import { TokenContext } from '../components/token-context'
import LoginCard from '../components/login-card'

const LoginPage = ({ navigation }) => {
  const { token } = React.useContext(TokenContext)
  const navigate = useNavigate()

  if (token) {
    navigate('/lists')
  }

  return <LoginCard />
}

export default LoginPage
