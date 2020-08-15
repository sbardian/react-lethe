/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, css } from '@emotion/core'
import logo from '../brain.png'

const PageLayout = ({ children }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        width: 100%;
        height: 100vh;
        @media (min-width: 800px) {
          grid-template-columns: 1fr 4fr;
          grid-template-rows: 100px 1fr;
        }
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 2fr;
          color: white;
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
      <div>header</div>
      <div
        css={css`
          display: none;
          @media (min-width: 800px) {
            display: grid;
          }
        `}
      >
        sidebar
      </div>
      {children}
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
