/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { TokenContext } from '../contexts/token-context/token-context'
import logo from '../../brain.png'

const LoginForm = ({ flipCard }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [loginError, setLoginError] = React.useState('')

  const { setToken } = React.useContext(TokenContext)

  const LOGIN = gql`
    mutation userLogin($username: String!, $password: String!) {
      login(loginInput: { username: $username, password: $password }) {
        token
      }
    }
  `

  const [userLogin, { data: loginData }] = useMutation(LOGIN, {
    onError: (error) => {
      setLoginError(error.message)
    },
  })

  React.useEffect(() => {
    if (loginData?.login?.token) {
      setToken(loginData.login.token)
    }
  }, [loginData, setToken])

  const login = (data) => {
    if (data) {
      const { username, password } = data
      userLogin({ variables: { username, password } })
    }
  }

  return (
    <div
      sx={{
        display: 'grid',
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
          gridTemplateRows: '250px 300px 150px',
          justifyItems: 'center',
          webkitBoxShadow: '0px 6px 54px -5px rgba(0, 0, 0, 0.75)',
          mozBoxShadow: '0px 6px 54px -5px rgba(0, 0, 0, 0.75)',
          boxShadow: '0px 6px 54px -5px rgba(0, 0, 0, 0.75)',
          backgroundColor: 'backgroundSecondary',
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
          onSubmit={handleSubmit(login)}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            fontSize: 1,
          }}
        >
          <h2
            sx={{
              justifySelf: 'center',
              color: 'textSecondary',
            }}
          >
            Login
          </h2>
          <label
            htmlFor="username"
            sx={{
              display: 'grid',
              color: 'textSecondary',
              alignSelf: 'end',
              marginTop: 2,
            }}
          >
            Username
            <input
              sx={{
                color: 'textSecondary',
                borderRadius: '5px',
                fontSize: 1,
              }}
              type="text"
              id="username"
              {...register('username', { required: true })}
            />
          </label>
          {errors.username && (
            <span
              sx={{
                color: 'textError',
                fontSize: 10,
              }}
            >
              Username is required
            </span>
          )}
          <label
            htmlFor="password"
            sx={{
              display: 'grid',
              color: 'textSecondary',
              alignSelf: 'end',
              marginTop: 2,
            }}
          >
            Password
            <input
              sx={{
                color: 'textSecondary',
                borderRadius: '5px',
                fontSize: 1,
              }}
              type="password"
              id="password"
              {...register('password', { required: true })}
            />
          </label>
          {errors.password && (
            <span
              sx={{
                color: 'textError',
                fontSize: 10,
              }}
            >
              Password is required
            </span>
          )}
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'auto',
              gap: 4,
              alignContent: 'start',
              marginTop: 3,
            }}
          >
            <button
              type="submit"
              sx={{
                // all: 'unset',
                border: 'none',
                padding: 2,
                borderRadius: '10px',
                fontSize: 3,
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
              Login
            </button>
            <button
              type="button"
              sx={{
                border: 'none',
                padding: 2,
                borderRadius: '10px',
                fontSize: 3,
                boxShadow: 'none',
                backgroundColor: 'transparent',
                color: 'textSecondary',
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                reset()
                setLoginError('')
                flipCard()
              }}
            >
              Register
            </button>
          </div>
          <React.Fragment>
            {loginError ? (
              <div sx={{ color: 'textError', justifySelf: 'center' }}>
                {loginError}
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

LoginForm.propTypes = {
  flipCard: PropTypes.func.isRequired,
}

export default LoginForm
