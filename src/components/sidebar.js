/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import {
  AiOutlineUnorderedList,
  AiOutlineProfile,
  AiOutlineSetting,
} from 'react-icons/ai'
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
        <li
          css={css`
            display: flex;
          `}
        >
          <AiOutlineUnorderedList
            css={css`
              padding-right: 10px;
            `}
          />
          Lists
        </li>
        <li
          css={css`
            display: flex;
          `}
        >
          <AiOutlineProfile
            css={css`
              padding-right: 10px;
            `}
          />
          Profile
        </li>
        <li
          css={css`
            display: flex;
          `}
        >
          <AiOutlineSetting
            css={css`
              padding-right: 10px;
            `}
          />
          Settings
        </li>
      </ul>
    </div>
  ) : (
    <div></div>
  )
}

export default SideBar
