/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { gql, useMutation } from '@apollo/client'
import ReactCardFlip from 'react-card-flip'
import { TokenContext } from '../components/token-context'
import logo from '../brain.png'

const LoginForm = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [signUpUsername, setSignUpUsername] = React.useState('')
  const [signUpPassword, setSignUpPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [email, setEmail] = React.useState('')

  const [isFlipped, setIsFlipped] = React.useState(false)

  const { setToken } = React.useContext(TokenContext)

  const handleChange = (event, type) => {
    switch (type) {
      case 'username':
        setUsername(event.target.value)
        break
      case 'password':
        setPassword(event.target.value)
        break
      default:
        break
    }
  }

  const handleSignUpChange = (event, type) => {
    switch (type) {
      case 'username':
        setSignUpUsername(event.target.value)
        break
      case 'email':
        setEmail(event.target.value)
        break
      case 'password':
        setSignUpPassword(event.target.value)
        break
      case 'confirmPassword':
        setConfirmPassword(event.target.value)
        break
      default:
        break
    }
  }

  const LOGIN = gql`
    mutation userLogin($username: String!, $password: String!) {
      login(loginInput: { username: $username, password: $password }) {
        token
      }
    }
  `

  const SIGN_UP = gql`
    mutation signUp($username: String!, $email: String!, $password: String!) {
      signup(
        signupInput: { username: $username, email: $email, password: $password }
      ) {
        token
      }
    }
  `

  const [userLogin, { data: loginData }] = useMutation(LOGIN)

  const [userSignUp, { data: signUpData }] = useMutation(SIGN_UP)

  React.useEffect(() => {
    if (loginData?.login?.token) {
      setToken(loginData.login.token)
    }
  }, [loginData])

  const login = () => {
    userLogin({ variables: { username, password } })
  }

  const signup = () => {
    userSignUp({
      variables: { username: signUpUsername, email, password: signUpPassword },
    })
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  if (signUpData?.signup?.token) {
    const { token } = signUpData.signup
    setToken(token)
  }

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      infinite={true}
      containerStyle={{ position: 'initial' }}
    >
      <div
        css={css`
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr;
          justify-content: center;
          justify-items: center;
          @media (min-width: 762px) {
            grid-template-columns: 600px;
            padding-top: 100px;
          }
        `}
      >
        <div
          css={css`
            display: grid;
            gap: 20px;
            grid-template-columns: 1fr;
            grid-template-rows: 250px 300px 150px;
            justify-items: center;
            -webkit-box-shadow: 0px 6px 54px -5px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 6px 54px -5px rgba(0, 0, 0, 0.75);
            box-shadow: 0px 6px 54px -5px rgba(0, 0, 0, 0.75);
            background-color: #e1e1e1;
            width: 100%;
          `}
        >
          <div>
            <img
              src={logo}
              alt="Logo"
              css={css`
                width: 350px;
                height: 250px;
              `}
            />
          </div>
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr;
              font-size: 1.5rem;
            `}
          >
            <h2
              css={css`
                justify-self: center;
                color: #666;
              `}
            >
              Login
            </h2>
            <label
              htmlFor="username"
              css={css`
                color: #666;
                align-self: end;
              `}
            >
              Username
            </label>
            <input
              css={css`
                color: #666;
                border-radius: 5px;
                font-size: 1.5rem;
                height: 2rem;
              `}
              type="text"
              id="username"
              value={username}
              onChange={(event) => handleChange(event, 'username')}
            />
            <label
              htmlFor="password"
              css={css`
                color: #666;
                align-self: end;
              `}
            >
              Password
            </label>
            <input
              css={css`
                color: #666;
                border-radius: 5px;
                font-size: 1.5rem;
                height: 2rem;
              `}
              type="password"
              id="password"
              alue={password}
              onChange={(event) => handleChange(event, 'password')}
            />
          </div>
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-template-rows: auto;
              gap: 20px;
              align-content: start;
            `}
          >
            <button
              css={css`
                all: unset;
                padding: 10px;
                border-radius: 10px;
                font-size: 2rem;
                box-shadow: none;
                background-color: #4ababa;
                color: white;
                display: flex;
                justify-content: center;
                cursor: pointer;
              `}
              onClick={() => {
                login()
              }}
            >
              Login
            </button>
            <button
              css={css`
                all: unset;
                padding: 10px;
                border-radius: 10px;
                font-size: 2rem;
                box-shadow: none;
                background-color: #f75300;
                color: white;
                display: flex;
                justify-content: center;
                cursor: pointer;
              `}
              onClick={() => {
                flipCard()
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      <div
        css={css`
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr;
          justify-content: center;
          justify-items: center;
          @media (min-width: 762px) {
            padding-top: 100px;
            grid-template-columns: 600px;
          }
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 250px 1fr 150px;
            justify-items: center;
            -webkit-box-shadow: 0px 6px 54px -5px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 6px 54px -5px rgba(0, 0, 0, 0.75);
            box-shadow: 0px 6px 54px -5px rgba(0, 0, 0, 0.75);
            background-color: #666;
            width: 100%;
          `}
        >
          <div>
            <img
              src={logo}
              alt="Logo"
              css={css`
                width: 350px;
                height: 250px;
              `}
            />
          </div>
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr;
              font-size: 1.5rem;
            `}
          >
            <h2
              css={css`
                justify-self: center;
              `}
            >
              Register
            </h2>
            <label
              htmlFor="signup-username"
              css={css`
                align-self: flex-end;
              `}
            >
              Username
            </label>
            <input
              css={css`
                color: #666;
                border-radius: 5px;
                font-size: 1.5rem;
                height: 2rem;
              `}
              type="text"
              id="signup-username"
              value={signUpUsername}
              onChange={(event) => handleSignUpChange(event, 'username')}
            />
            <label
              htmlFor="email"
              css={css`
                align-self: flex-end;
              `}
            >
              Email
            </label>
            <input
              css={css`
                color: #666;
                border-radius: 5px;
                font-size: 1.5rem;
                height: 2rem;
              `}
              type="text"
              id="email"
              value={email}
              onChange={(event) => handleSignUpChange(event, 'email')}
            />
            <label
              htmlFor="signup-password"
              css={css`
                align-self: flex-end;
              `}
            >
              Password
            </label>
            <input
              css={css`
                color: #666;
                border-radius: 5px;
                font-size: 1.5rem;
                height: 2rem;
              `}
              type="password"
              id="signup-password"
              value={signUpPassword}
              onChange={(event) => handleSignUpChange(event, 'password')}
            />
            <label
              htmlFor="confirm-password"
              css={css`
                align-self: flex-end;
              `}
            >
              Confirm Password
            </label>
            <input
              css={css`
                color: #666;
                border-radius: 5px;
                font-size: 1.5rem;
                height: 2rem;
              `}
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(event) => handleSignUpChange(event, 'confirmPassword')}
            />
          </div>
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-template-rows: auto;
              gap: 20px;
              margin-top: 20px;
              align-content: start;
            `}
          >
            <button
              css={css`
                all: unset;
                padding: 10px;
                border-radius: 10px;
                font-size: 2rem;
                box-shadow: none;
                background-color: ${signUpPassword !== confirmPassword
                  ? '#666'
                  : '#4ababa'};
                color: white;
                display: flex;
                justify-content: center;
                cursor: pointer;
              `}
              disabled={signUpPassword !== confirmPassword ? true : false}
              onClick={() => {
                signup()
              }}
            >
              Register
            </button>
            <button
              css={css`
                all: unset;
                padding: 10px;
                border-radius: 10px;
                font-size: 2rem;
                box-shadow: none;
                background-color: #f75300;
                color: white;
                display: flex;
                justify-content: center;
                cursor: pointer;
              `}
              onClick={() => {
                flipCard()
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </ReactCardFlip>
  )
}

export default LoginForm
