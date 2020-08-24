/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'

const LetheInput = ({ children, ...rest }) => {
  return (
    <input
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
    >
      {children}
    </input>
  )
}

export default LetheInput
