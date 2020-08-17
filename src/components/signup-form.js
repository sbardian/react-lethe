/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, css } from '@emotion/core'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { TokenContext } from '../components/token-context'
import logo from '../brain.png'

const SignUpForm = ({ flipCard }) => {
  const { register, handleSubmit, getValues, errors } = useForm()

  const { setToken } = React.useContext(TokenContext)

  const SIGN_UP = gql`
    mutation signUp($username: String!, $email: String!, $password: String!) {
      signup(
        signupInput: { username: $username, email: $email, password: $password }
      ) {
        token
      }
    }
  `

  const [userSignUp, { data: signUpData }] = useMutation(SIGN_UP)

  const signup = (data) => {
    if (data) {
      const { username, email, password, passwordConfirm } = data
      userSignUp({
        variables: { username, email, password },
      })
    }
  }

  if (signUpData?.signup?.token) {
    const { token } = signUpData.signup
    setToken(token)
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
        <form
          onSubmit={handleSubmit(signup)}
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
            name="username"
            ref={register({
              required: 'Username is required',
              minLength: {
                value: 2,
                message: 'Min username length is 2 characters',
              },
            })}
          />
          {errors.username && (
            <span
              css={css`
                color: tomato;
                font-size: 1rem;
              `}
            >
              {errors.username.message}
            </span>
          )}
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
            name="email"
            ref={register({
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <span
              css={css`
                color: tomato;
                font-size: 1rem;
              `}
            >
              {errors.email.message}
            </span>
          )}
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
            name="password"
            ref={register({
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Min password length is 8 characters',
              },
            })}
          />
          {errors.password && (
            <span
              css={css`
                color: tomato;
                font-size: 1rem;
              `}
            >
              {errors.password.message}
            </span>
          )}
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
            name="passwordConfirm"
            ref={register({
              required: 'Password confirmation is required',
              minLength: {
                value: 8,
                message: 'Min password length is 8 characters',
              },
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues()
                  return password === value || 'Passwords should match!'
                },
              },
            })}
          />
          {errors.passwordConfirm && (
            <span
              css={css`
                color: tomato;
                font-size: 1rem;
              `}
            >
              {errors.passwordConfirm.message}
            </span>
          )}
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
                background-color: none;
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
        </form>
      </div>
    </div>
  )
}

SignUpForm.propTypes = {
  flipCard: PropTypes.func.isRequired,
}

export default SignUpForm
