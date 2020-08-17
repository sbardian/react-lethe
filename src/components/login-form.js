/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, css } from '@emotion/core'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { TokenContext } from '../components/token-context'
import logo from '../brain.png'

const LoginForm = ({ flipCard }) => {
  const { register, handleSubmit, watch, errors } = useForm()

  const { setToken } = React.useContext(TokenContext)

  const LOGIN = gql`
    mutation userLogin($username: String!, $password: String!) {
      login(loginInput: { username: $username, password: $password }) {
        token
      }
    }
  `

  const [userLogin, { data: loginData }] = useMutation(LOGIN)

  React.useEffect(() => {
    if (loginData?.login?.token) {
      setToken(loginData.login.token)
    }
  }, [loginData])

  const login = (data) => {
    if (data) {
      const { username, password } = data
      userLogin({ variables: { username, password } })
    }
  }

  return (
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
        <form
          onSubmit={handleSubmit(login)}
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
            name="username"
            type="text"
            id="username"
            ref={register({ required: true })}
          />
          {errors.username && (
            <span
              css={css`
                color: tomato;
                font-size: 1rem;
              `}
            >
              Username is required
            </span>
          )}
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
            name="password"
            type="password"
            id="password"
            ref={register({ required: true })}
          />
          {errors.password && (
            <span
              css={css`
                color: tomato;
                font-size: 1rem;
              `}
            >
              Password is required
            </span>
          )}
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-template-rows: auto;
              gap: 20px;
              align-content: start;
              margin-top: 20px;
            `}
          >
            <button
              type="submit"
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
              type="button"
              css={css`
                all: unset;
                padding: 10px;
                border-radius: 10px;
                font-size: 2rem;
                box-shadow: none;
                background-color: none;
                color: #666;
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
        </form>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  flipCard: PropTypes.func.isRequired,
}

export default LoginForm
