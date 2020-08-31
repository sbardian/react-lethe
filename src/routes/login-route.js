import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../components/contexts/token-context/token-context'
import LoginCard from '../components/login-card/login-card'

const LoginRoute = () => {
  const { token } = React.useContext(TokenContext)
  const navigate = useNavigate()

  if (token) {
    navigate('/lists')
  }

  return <LoginCard />
}

export default LoginRoute
