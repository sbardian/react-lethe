/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { useNavigate } from '@reach/router'
import { TokenContext } from '../components/token-context'
import MenuButton from './menu-button'
import logo from '../brain.png'

const Header = () => {
  const { removeToken } = React.useContext(TokenContext)
  const navigate = useNavigate()

  const logout = () => {
    removeToken()
    navigate('/')
  }

  return (
    <div
      css={css`
        display: grid;
        gap: 20px;
        grid-template-columns: 1fr;
        grid-template-rows: 100px 100px;
        @media (min-width: 800px) {
          grid-template-columns: 1fr 5fr;
          grid-template-rows: unset;
        }
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 5fr;
          align-content: start;
        `}
      >
        <img
          src={logo}
          alt="logo"
          css={css`
            align-self: center;
            height: 75px;
            width: 125px;
          `}
        />
        <span
          css={css`
            align-self: center;
            font-size: 2rem;
          `}
        >
          Lethe
        </span>
      </div>
      <div
        css={css`
          display: grid;
          grid-template-rows: 1fr 1fr;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 5fr;
            align-items: center;
          `}
        >
          <MenuButton />
          <div
            css={css`
              justify-self: end;
              padding-top: 20px;
              padding-right: 20px;
            `}
          >
            <button
              css={css`
                border: 1px solid #666;
                cursor: pointer;
                padding: 10px;
                border-radius: 5px;
                background-color: #666;
                font-size: 1.1rem;
              `}
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
