/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Header from '../header/header'
import SideBar from '../sidebar/sidebar'

const PageLayout = ({ children }) => {
  return (
    <div
      className="pagelayout-container"
      sx={{
        display: 'grid',
        gridTemplateRows: '200px 1fr',
        gap: 1,
        width: '100%',
        height: '100vh',
        '@media (min-width: 800px)': {
          gridTemplateRows: '100px 1fr',
          gridTemplateColumns: 'unset',
        },
      }}
    >
      <header>
        <Header />
      </header>
      <div
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          '@media (min-width: 800px)': {
            gridTemplateRows: 'unset',
            gridTemplateColumns: 'auto 5fr',
          },
        }}
      >
        <aside>
          <SideBar />
        </aside>
        <main sx={{ height: '100%', width: '100%' }}>{children}</main>
      </div>
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
