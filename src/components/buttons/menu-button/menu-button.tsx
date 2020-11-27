/** @jsx jsx */
import * as React from 'react'
import { jsx } from 'theme-ui'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { MenuContext } from '../../contexts/menu-context/menu-context'
import handleKeyPress from '../../../utils/on-key-press'

const MenuButton = () => {
  // const { isSideBarOpen, setIsSideBarOpen } = React.useContext(MenuContext)

  const menuContext = React.useContext(MenuContext)

  const toggleSidebar = () => {
    if (menuContext) {
      menuContext.setIsSideBarOpen(!menuContext.isSideBarOpen)
    }
  }

  return menuContext?.isSideBarOpen ? (
    <AiOutlineMenuFold
      data-testid="hide-menu-button"
      aria-label="Hide Menu"
      tabIndex={0}
      size="30"
      onKeyPress={(event) => handleKeyPress(event, toggleSidebar)}
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
      data-testid="show-menu-button"
      aria-label="Show Menu"
      tabIndex={0}
      size="30"
      onKeyPress={(event) => handleKeyPress(event, toggleSidebar)}
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
