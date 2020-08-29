/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { useHistory } from 'react-router-dom'

const GoBack = ({ children }) => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return (
    <div
      role="button"
      tabIndex={0}
      sx={{
        fontSize: 3,
        cursor: 'pointer',
        width: '30px',
        '&:hover': {
          color: 'colorThree',
        },
      }}
      onKeyPress={goBack}
      onClick={goBack}
    >
      {children}
    </div>
  )
}

GoBack.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GoBack
