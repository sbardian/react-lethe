/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { MenuContext } from './menu-context'

const MenuButton = () => {
  const { isOpen, setIsOpen } = React.useContext(MenuContext)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return isOpen ? (
    <AiOutlineMenuFold
      size="30"
      css={css`
        padding: 10px;
      `}
      onClick={() => toggleSidebar()}
    />
  ) : (
    <AiOutlineMenuUnfold
      size="30"
      css={css`
        padding: 10px;
      `}
      onClick={() => toggleSidebar()}
    />
  )
}

export default MenuButton
