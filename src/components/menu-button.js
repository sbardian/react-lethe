/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, css } from '@emotion/core'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { MenuContext } from './menu-context'

const MenuButton = () => {
  const { isOpen, setIsOpen } = React.useContext(MenuContext)
  console.log('isOpen: ', isOpen)

  return isOpen ? (
    <AiOutlineMenuFold
      size="30"
      css={css`
        padding: 10px;
      `}
      onClick={() => {
        console.log('close')
        //   const pageLayoutContainer = document.querySelector(
        //     '.pagelayout-container',
        //   )
        //   const sidebar = document.querySelector('.sidebar')
        //   pageLayoutContainer.style.gridTemplateColumns = '1fr'
        //   sidebar.style.display = 'none'
        setIsOpen(!isOpen)
      }}
    />
  ) : (
    <AiOutlineMenuUnfold
      size="30"
      css={css`
        padding: 10px;
      `}
      onClick={() => {
        console.log('open')
        //   const pageLayoutContainer = document.querySelector(
        //     '.pagelayout-container',
        //   )
        //   const sidebar = document.querySelector('.sidebar')
        //   pageLayoutContainer.style.gridTemplateColumns = '1fr 4fr'
        //   sidebar.style.display = 'grid'
        setIsOpen(!isOpen)
      }}
    />
  )
}

export default MenuButton
