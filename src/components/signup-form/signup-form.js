/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { TokenContext } from '../contexts/token-context/token-context'
import logo from '../../brain.png'

const SignUpForm = ({ flipCard }) => {
  const { register, handleSubmit, getValues, errors, reset } = useForm()
  const [registerError, setRegisterError] = React.useState('')

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

  const [userSignUp, { data: signUpData }] = useMutation(SIGN_UP, {
    onError: (error) => {
      setRegisterError(error.message)
    },
  })

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
      sx={{
        display: 'grid',
        gap: 1,
        gridTemplateColumns: '1fr',
        justifyContent: 'center',
        justifyItems: 'center',
        '@media (min-width: 762px)': {
          gridTemplateColumns: '600px',
          paddingTop: 6,
        },
      }}
    >
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: '250px 1fr 150px',
          justifyItems: 'center',
          webkitBoxShadow: '0px 6px 54px -5px rgba(0, 0, 0, 0.75)',
          mozBoxShadow: '0px 6px 54px -5px rgba(0, 0, 0, 0.75)',
          boxShadow: '0px 6px 54px -5px rgba(0, 0, 0, 0.75)',
          backgroundColor: 'background',
          width: '100%',
        }}
      >
        <div>
          <img
            src={logo}
            alt="Logo"
            sx={{
              width: '350px',
              height: '250px',
            }}
          />
        </div>
        <form
          onSubmit={handleSubmit(signup)}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            fontSize: 1,
            color: 'textSecondary',
          }}
        >
          <h2
            sx={{
              justifySelf: 'center',
            }}
          >
            Register
          </h2>
          <label
            htmlFor="signup-username"
            sx={{
              display: 'grid',
              alignSelf: 'end',
              marginTop: 2,
            }}
          >
            Username
            <input
              sx={{
                color: 'textDark',
                borderRadius: '5px',
                fontSize: 1,
              }}
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
          </label>
          {errors.username && (
            <span
              sx={{
                color: 'textError',
                fontSize: 10,
              }}
            >
              {errors.username.message}
            </span>
          )}
          <label
            htmlFor="email"
            sx={{
              display: 'grid',
              alignSelf: 'end',
              marginTop: 2,
            }}
          >
            Email
            <input
              sx={{
                color: 'textDark',
                borderRadius: '5px',
                fontSize: 1,
              }}
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
          </label>
          {errors.email && (
            <span
              sx={{
                color: 'textError',
                fontSize: 10,
              }}
            >
              {errors.email.message}
            </span>
          )}
          <label
            htmlFor="signup-password"
            sx={{
              display: 'grid',
              alignSelf: 'end',
              marginTop: 2,
            }}
          >
            Password
            <input
              sx={{
                color: 'textDark',
                borderRadius: '5px',
                fontSize: 1,
              }}
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
          </label>
          {errors.password && (
            <span
              sx={{
                color: 'textError',
                fontSize: 10,
              }}
            >
              {errors.password.message}
            </span>
          )}
          <label
            htmlFor="confirm-password"
            sx={{
              display: 'grid',
              alignSelf: 'end',
              marginTop: 2,
            }}
          >
            Confirm Password
            <input
              sx={{
                display: 'grid',
                color: 'textDark',
                borderRadius: '5px',
                fontSize: 1,
              }}
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
          </label>
          {errors.passwordConfirm && (
            <span
              sx={{
                color: 'textError',
                fontSize: 10,
              }}
            >
              {errors.passwordConfirm.message}
            </span>
          )}
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'auto',
              gap: 4,
              alignContent: 'start',
              marginTop: 2,
            }}
          >
            <button
              type="button"
              sx={{
                border: 'none',
                borderRadius: '10px',
                fontSize: 3,
                padding: 2,
                boxShadow: 'none',
                backgroundColor: 'transparent',
                color: 'textSecondary',
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                reset()
                setRegisterError('')
                flipCard()
              }}
            >
              Login
            </button>
            <button
              type="submit"
              sx={{
                border: 'none',
                borderRadius: '10px',
                fontSize: 3,
                padding: 2,
                boxShadow: 'none',
                backgroundColor: 'transparent',
                color: 'textSecondary',
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover, &:focus': {
                  backgroundColor: 'colorThree',
                  color: 'text',
                },
              }}
            >
              Register
            </button>
          </div>
          <React.Fragment>
            {registerError ? (
              <div sx={{ color: 'textError', justifySelf: 'center' }}>
                {registerError}
              </div>
            ) : (
              <div />
            )}
          </React.Fragment>
        </form>
      </div>
    </div>
  )
}

SignUpForm.propTypes = {
  flipCard: PropTypes.func.isRequired,
}

export default SignUpForm
