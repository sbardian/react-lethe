/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import {
  AiOutlineUnorderedList,
  AiOutlineProfile,
  AiOutlineSetting,
} from 'react-icons/ai'
import { MenuContext } from '../contexts/menu-context/menu-context'
import SideBarLink from './sidebar-link'

const SideBar = () => {
  const { isSideBarOpen } = React.useContext(MenuContext)

  return isSideBarOpen ? (
    <nav
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
        <SideBarLink to="/lists" title="Lists">
          <AiOutlineUnorderedList size="34" />
        </SideBarLink>

        <SideBarLink to="/profile" title="Profile">
          <AiOutlineProfile size="34" />
        </SideBarLink>
        <SideBarLink to="/settings" title="Settings">
          <AiOutlineSetting size="34" />
        </SideBarLink>
      </ul>
    </nav>
  ) : (
    <div />
  )
}

export default SideBar
