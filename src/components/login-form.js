/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { gql, useMutation } from '@apollo/client'
import { TokenContext } from '../components/token-context'
import logo from '../brain.png'

const LoginForm = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { token, setToken } = React.useContext(TokenContext)

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

  const LOGIN = gql`
    mutation userLogin($username: String!, $password: String!) {
      login(loginInput: { username: $username, password: $password }) {
        token
      }
    }
  `

  const [userLogin, { data }] = useMutation(LOGIN)

  const login = () => {
    userLogin({ variables: { username, password } })
  }

  React.useEffect(() => {
    if (data?.login?.token) {
      setToken(data)
    }
  }, [data])

  return (
    <div
      css={css`
        display: grid;
        gap: 20px;
        grid-template-columns: 1fr;
        justify-content: center;
        justify-items: center;
        margin-top: 100px;
        @media (min-width: 762px) {
          grid-template-columns: 600px;
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
          padding: 20px;
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
            gap: 20px;
            grid-template-columns: 1fr;
            font-size: 2rem;
            width: 100%;
          `}
        >
          <label
            htmlFor="username"
            css={css`
              color: #666;
              align-self: flex-end;
            `}
          >
            Username
          </label>
          <input
            css={css`
              color: #666;
              border-radius: 5px;
              font-size: 2rem;
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
              align-self: flex-end;
            `}
          >
            Password
          </label>
          <input
            css={css`
              color: #666;
              border-radius: 5px;
              font-size: 2rem;
            `}
            type="password"
            id="password"
            alue={password}
            onChange={(event) => handleChange(event, 'password')}
          />
        </div>
        <div>
          <button
            css={css`
              padding: 10px;
              border-radius: 10px;
              font-size: 2rem;
              box-shadow: none;
              background-color: rgb(171, 0, 219);
            `}
            onClick={() => {
              login()
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
