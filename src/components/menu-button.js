/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { MenuContext } from './menu-context'

const MenuButton = () => {
  const { isSideBarOpen, setIsSideBarOpen } = React.useContext(MenuContext)

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return isSideBarOpen ? (
    <AiOutlineMenuFold
      size="30"
      onClick={() => toggleSidebar()}
      sx={{
        color: 'textSecondary',
        '&:hover': {
          color: 'colorThree',
          cursor: 'pointer',
        },
      }}
    />
  ) : (
    <AiOutlineMenuUnfold
      size="30"
      onClick={() => toggleSidebar()}
      sx={{
        color: 'textSecondary',
        '&:hover': {
          color: 'colorThree',
          cursor: 'pointer',
        },
      }}
    />
  )
}

export default MenuButton
