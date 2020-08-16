/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { MenuContext } from './menu-context'

const MenuButton = () => {
  const { isSideBarOpen, setIsSideBarOpen } = React.useContext(MenuContext)

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return isSideBarOpen ? (
    <AiOutlineMenuFold size="30" onClick={() => toggleSidebar()} />
  ) : (
    <AiOutlineMenuUnfold size="30" onClick={() => toggleSidebar()} />
  )
}

export default MenuButton
