/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import MenuButton from './menu-button'
import logo from '../brain.png'

const Header = () => {
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
          <div>other content</div>
        </div>
      </div>
    </div>
  )
}

export default Header
