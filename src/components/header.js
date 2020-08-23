/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, useThemeUI } from 'theme-ui'
// import { jsx, css } from '@emotion/core'
import { gql, useQuery } from '@apollo/client'
import { useNavigate } from '@reach/router'
import { TokenContext } from '../components/token-context'
import MenuButton from './menu-button'
import logo from '../brain.png'

const Header = () => {
  const { removeToken } = React.useContext(TokenContext)
  const navigate = useNavigate()

  const { colorMode, setColorMode } = useThemeUI()

  const logout = () => {
    removeToken()
    navigate('/')
  }

  const GET_MY_LISTS = gql`
    {
      getMyInfo {
        id
        username
      }
    }
  `

  const { data, loading, error } = useQuery(GET_MY_LISTS)

  if (loading) {
    return (
      <p
        sx={{
          color: 'textLight',
          fontSize: 2,
        }}
      >
        Loading...
      </p>
    )
  }
  if (error) return <p>{`ERROR: ${error}`}</p>
  if (!data) return <p>You currently have no lists. Create some!</p>

  const { username } = data.getMyInfo
  const letter = username[0].toUpperCase()
  const restOfName = username.slice(1)

  return (
    <div
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: '1fr',
        gridTemplateRows: '100px 100px',
        '@media (min-width: 800px)': {
          gridTemplateColumns: '190px 1fr',
          gridTemplateRows: 'unset',
        },
      }}
    >
      <div
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto auto',
          alignContent: 'start',
          justifyContent: 'center',
        }}
      >
        <img
          src={logo}
          alt="logo"
          sx={{
            alignSelf: 'center',
            height: '75px',
            width: '125px',
            paddingTop: 1,
          }}
        />
        <span
          sx={{
            alignSelf: 'center',
            justifySelf: 'center',
            fontSize: 3,
          }}
        >
          Lethe
        </span>
      </div>
      <div
        sx={{
          display: 'grid',
          gridTemplateRows: '1fr 1fr',
        }}
      >
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 5fr',
            alignItems: 'center',
            marginLeft: 3,
            marginRight: 3,
            '@media (min-width: 800px)': {
              marginLeft: 0,
            },
          }}
        >
          <MenuButton />
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 3,
              justifySelf: 'end',
              paddingTop: 3,
            }}
          >
            <button
              sx={{
                cursor: 'pointer',
                padding: 2,
                borderRadius: '5px',
                backgroundColor: 'colorThree',
                fontSize: 2,
                border: 'none',
                color: 'text',
              }}
              onClick={() => {
                setColorMode(colorMode === 'dark' ? 'light' : 'dark')
              }}
            >
              Mode
            </button>
            <button
              sx={{
                cursor: 'pointer',
                padding: 2,
                borderRadius: '5px',
                backgroundColor: 'colorThree',
                fontSize: 2,
                border: 'none',
                color: 'text',
              }}
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
        <div
          sx={{
            display: 'grid',
            alignContent: 'start',
            margin: ({ space }) => `0 ${space.space} 0 ${space.space}`,
            '@media (min-width: 800px)': {
              margin: 0,
            },
          }}
        >
          {`Welcome ${letter}${restOfName}!`}
        </div>
      </div>
    </div>
  )
}

export default Header
