/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, css } from '@emotion/core'
import Header from './header'
import SideBar from './sidebar'

const PageLayout = ({ children }) => {
  return (
    <div
      className="pagelayout-container"
      css={css`
        display: grid;
        grid-template-rows: 200px 1fr;
        gap: 20px;
        width: 100%;
        height: 100vh;
        @media (min-width: 800px) {
          grid-template-rows: 100px 1fr;
          grid-template-columns: unset;
        }
      `}
    >
      <Header />
      <div
        css={css`
          display: grid;
          grid-template-rows: auto 1fr;
          @media (min-width: 800px) {
            grid-template-rows: unset;
            grid-template-columns: auto 5fr;
          }
        `}
      >
        <SideBar />
        {children}
      </div>
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
