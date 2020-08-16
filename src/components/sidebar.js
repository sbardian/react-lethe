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
  const { isSideBarOpen } = React.useContext(MenuContext)

  return isSideBarOpen ? (
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
        <Link
          css={css`
            text-decoration: none;
            color: white;
            padding: 7px;
          `}
          to="/lists"
          state={{ tab: null }}
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
        </Link>
        <Link
          css={css`
            text-decoration: none;
            color: white;
            padding: 7px;
          `}
          to="/profile"
        >
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
        </Link>
        <Link
          css={css`
            text-decoration: none;
            color: white;
            padding: 7px;
          `}
          to="/settings"
        >
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
        </Link>
      </ul>
    </div>
  ) : (
    <div></div>
  )
}

export default SideBar
