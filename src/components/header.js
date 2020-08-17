/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { gql, useQuery } from '@apollo/client'
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
        css={css`
          color: #666;
          font-size: 2rem;
        `}
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
      css={css`
        display: grid;
        gap: 20px;
        grid-template-columns: 1fr;
        grid-template-rows: 100px 100px;
        @media (min-width: 800px) {
          grid-template-columns: 190px 5fr;
          grid-template-rows: unset;
        }
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-rows: auto auto;
          align-content: start;
          justify-content: center;
        `}
      >
        <img
          src={logo}
          alt="logo"
          css={css`
            align-self: center;
            height: 75px;
            width: 125px;
            padding-top: 10px;
          `}
        />
        <span
          css={css`
            align-self: center;
            justify-self: center;
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
            margin-left: 20px;
            margin-right: 20px;
          `}
        >
          <MenuButton />
          <div
            css={css`
              justify-self: end;
              padding-top: 20px;
            `}
          >
            <button
              css={css`
                border: 1px solid #666;
                cursor: pointer;
                padding: 10px;
                border-radius: 5px;
                background-color: #4ababa;
                font-size: 1.1rem;
                color: white;
              `}
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
        <div
          css={css`
            margin: 0 20px 0 20px;
            display: grid;
            align-content: end;
          `}
        >
          {`Welcome ${letter}${restOfName}!`}
        </div>
      </div>
    </div>
  )
}

export default Header
