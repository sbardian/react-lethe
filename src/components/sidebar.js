/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { Link } from '@reach/router'
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
          <Link
            css={css`
              text-decoration: none;
            `}
            to="/lists"
          >
            <AiOutlineUnorderedList
              css={css`
                padding-right: 10px;
              `}
            />
            Lists
          </Link>
        </li>
        <li
          css={css`
            display: flex;
          `}
        >
          <Link
            css={css`
              text-decoration: none;
            `}
            to="/profile"
          >
            <AiOutlineProfile
              css={css`
                padding-right: 10px;
              `}
            />
            Profile
          </Link>
        </li>
        <li
          css={css`
            display: flex;
          `}
        >
          <Link
            css={css`
              text-decoration: none;
            `}
            to="/settings"
          >
            <AiOutlineSetting
              css={css`
                padding-right: 10px;
              `}
            />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <div></div>
  )
}

export default SideBar
