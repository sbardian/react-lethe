import React from 'react'
import { useHistory } from 'react-router-dom'
import { TokenContext } from '../components/contexts/token-context/token-context'
import LoginCard from '../components/login-card/login-card'

const LoginRoute = () => {
  const { token } = React.useContext(TokenContext)
  const history = useHistory()

  if (token) {
    history.push('/lists')
  }

  return <LoginCard />
}

export default LoginRoute
