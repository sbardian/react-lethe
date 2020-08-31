/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { useNavigate } from 'react-router-dom'
import handleKeyPress from '../../utils/on-key-press'

const GoBack = ({ children }) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <button
      type="button"
      tabIndex={0}
      sx={{
        fontSize: 3,
        border: 'none',
        color: 'textSecondary',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        width: '30px',
        '&:hover': {
          color: 'colorThree',
        },
      }}
      onKeyPress={(event) => () => handleKeyPress(event, handleGoBack)}
      onClick={handleGoBack}
    >
      {children}
    </button>
  )
}

GoBack.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GoBack
