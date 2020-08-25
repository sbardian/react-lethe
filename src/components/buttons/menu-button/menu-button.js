/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { MenuContext } from '../../contexts/menu-context/menu-context'

const MenuButton = () => {
  const { isSideBarOpen, setIsSideBarOpen } = React.useContext(MenuContext)

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return isSideBarOpen ? (
    <AiOutlineMenuFold
      aria-label="Hide Menu"
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
      aria-label="Show Menu"
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
