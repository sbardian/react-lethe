/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../contexts/token-context/token-context'
import { StoreContext } from '../contexts/store-context/store-context'
import MenuButton from '../buttons/menu-button/menu-button'
import ColorModeToggleButton from '../buttons/color-mode-toggle-button/color-mode-toggle-button'
import handleKeyPress from '../../utils/on-key-press'
import logo from '../../brain.png'

const Header = () => {
  const { removeToken } = React.useContext(TokenContext)
  const [state] = React.useContext(StoreContext)
  const navigate = useNavigate()

  const logout = () => {
    removeToken()
    navigate('/')
  }

  const { username } = state
  let letter
  let restOfName
  if (username) {
    letter = username[0].toUpperCase()
    restOfName = username.slice(1)
  }

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
            width: '125px',
            paddingTop: 1,
          }}
        />
        <span
          sx={{
            alignSelf: 'center',
            justifySelf: 'center',
            fontSize: 3,
            color: 'textSecondary',
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
            <ColorModeToggleButton />
            <button
              type="button"
              sx={{
                cursor: 'pointer',
                padding: 2,
                borderRadius: '5px',
                backgroundColor: 'colorThree',
                fontSize: 2,
                border: 'none',
                color: 'text',
              }}
              onKeyPress={(event) => () => handleKeyPress(event, logout)}
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
            color: 'textSecondary',
            marginLeft: 3,
            margin: ({ space }) => `0 ${space.space} 0 ${space.space}`,
            '@media (min-width: 800px)': {
              marginLeft: 0,
            },
          }}
        >
          {username ? `Welcome ${letter}${restOfName}!` : ''}
        </div>
      </div>
    </div>
  )
}

export default Header
