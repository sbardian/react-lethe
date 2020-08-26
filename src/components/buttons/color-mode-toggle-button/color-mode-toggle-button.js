/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, useColorMode } from 'theme-ui'
import { FiSunrise, FiSunset } from 'react-icons/fi'

const ColorModeToggleButton = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <button
      sx={{
        cursor: 'pointer',
        padding: 2,
        fontSize: 2,
        border: 'none',
        color: colorMode === 'dark' ? 'yellow' : 'textSecondary',
        backgroundColor: 'transparent',
      }}
      onClick={() => {
        setColorMode(colorMode === 'dark' ? 'light' : 'dark')
      }}
    >
      {colorMode === 'dark' ? <FiSunrise size="24" /> : <FiSunset size="24" />}
    </button>
  )
}

export default ColorModeToggleButton
