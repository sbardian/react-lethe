import React from 'react'
import ReactCardFlip from 'react-card-flip'
import LoginForm from '../login-form/login-form'
import SignUpForm from '../signup-form/signup-form'

const LoginCard = () => {
  const [isFlipped, setIsFlipped] = React.useState(false)

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      infinite={true}
      containerStyle={{ position: 'initial' }}
    >
      <LoginForm flipCard={flipCard} />
      <SignUpForm flipCard={flipCard} />
    </ReactCardFlip>
  )
}

export default LoginCard
