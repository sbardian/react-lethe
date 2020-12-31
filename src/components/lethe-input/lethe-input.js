/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const LetheInput = ({ label, ...rest }) => (
  <input
    data-testid="lethe-input"
    aria-label={`${label}-input`}
    sx={{
      color: 'textSecondary',
      borderRadius: '5px',
      lineHeight: 2,
      fontSize: 0,
      '@media (min-width: 430px)': {
        fontSize: 1,
        lineHeight: 2,
      },
    }}
    {...rest}
  />
)

LetheInput.propTypes = {
  label: PropTypes.string.isRequired,
}

export default LetheInput
