import React from 'react'
import ReactCardFlip from 'react-card-flip'
import { AlertWrapper } from 'react-alerts-plus'
import LoginForm from './login-form'
import SignUpForm from './signup-form'

const LoginCard = () => {
  const [isFlipped, setIsFlipped] = React.useState(false)

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <AlertWrapper>
      {({ show }) => (
        <ReactCardFlip
          isFlipped={isFlipped}
          infinite={true}
          containerStyle={{ position: 'initial' }}
        >
          <LoginForm flipCard={flipCard} show={show} />
          <SignUpForm flipCard={flipCard} show={show} />
        </ReactCardFlip>
      )}
    </AlertWrapper>
  )
}

export default LoginCard
