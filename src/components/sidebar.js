/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
// import { jsx, css } from '@emotion/core'
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
      sx={{
        padding: 3,
      }}
    >
      <ul
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateRows: 'repeat(auto-fit, auto)',
          alignItems: 'center',
          listStyle: 'none',
          fontSize: 1,
          paddingLeft: 0,
          '@media (min-width: 800px)': {
            minWidth: '150px',
            width: '100%',
          },
        }}
      >
        <Link
          sx={{
            textDecoration: 'none',
            color: 'text',
            padding: 2,
          }}
          to="/lists"
          state={{ tab: null }}
        >
          <li
            sx={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              alignItems: 'center',
            }}
          >
            <AiOutlineUnorderedList
              sx={{
                paddingRight: 2,
              }}
              size="34"
            />
            Lists
          </li>
        </Link>
        <Link
          sx={{
            textDecoration: 'none',
            color: 'text',
            padding: 2,
          }}
          to="/profile"
        >
          <li
            sx={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              alignItems: 'center',
            }}
          >
            <AiOutlineProfile
              sx={{
                paddingRight: 2,
              }}
              size="34"
            />
            Profile
          </li>
        </Link>
        <Link
          sx={{
            textDecoration: 'none',
            color: 'text',
            padding: 2,
          }}
          to="/settings"
        >
          <li
            sx={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              alignItems: 'center',
            }}
          >
            <AiOutlineSetting
              sx={{
                paddingRight: 2,
              }}
              size="34"
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
