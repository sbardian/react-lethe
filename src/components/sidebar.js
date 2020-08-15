/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { MenuContext } from './menu-context'

const SideBar = () => {
  const { isOpen } = React.useContext(MenuContext)

  return isOpen ? (
    <div
      css={css`
        padding: 20px;
      `}
    >
      <ul
        css={css`
          display: grid;
          gap: 20px;
          grid-template-rows: repeat(auto-fit, auto);
          align-items: center;
          list-style: none;
          padding-left: 0px;
          @media (min-width: 800px) {
            min-width: 150px;
          }
        `}
      >
        <li>sidebar</li>
        <li>sidebar</li>
        <li>sidebar</li>
        <li>sidebar</li>
        <li>sidebar</li>
        <li>sidebar</li>
      </ul>
    </div>
  ) : (
    <div></div>
  )
}

export default SideBar
