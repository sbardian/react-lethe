/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { useNavigate } from '@reach/router'

const GoBack = ({ children }) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div
      sx={{
        fontSize: 3,
        cursor: 'pointer',
        width: '30px',
        '&:hover': {
          color: 'colorThree',
        },
      }}
      onClick={goBack}
    >
      {children}
    </div>
  )
}

export default GoBack
