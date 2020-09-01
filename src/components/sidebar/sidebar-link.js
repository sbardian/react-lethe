/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { Link, useMatch } from 'react-router-dom'

const SideBarLink = ({ children, title, to }) => {
  const isActive = useMatch({ path: to, caseSensitive: true, end: false })

  return (
    <li
      sx={{
        color: isActive ? 'text' : 'textSecondary',
        backgroundColor: isActive ? 'colorThree' : 'transparent',
        padding: 2,
        '&:hover': {
          color: 'text',
          backgroundColor: 'colorThree',
        },
      }}
    >
      <Link
        sx={{
          color: 'inherit',
          textDecoration: 'none',
          display: 'grid',
          gridTemplateColumns: '40px 1fr',
          alignItems: 'center',
        }}
        tabIndex={0}
        to={to}
      >
        {children}
        {title}
      </Link>
    </li>
  )
}

SideBarLink.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default SideBarLink
