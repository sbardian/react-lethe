/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Link, useMatch } from 'react-router-dom'
import {
  AiOutlineUnorderedList,
  AiOutlineProfile,
  AiOutlineSetting,
} from 'react-icons/ai'
import { MenuContext } from '../contexts/menu-context/menu-context'

const SideBar = () => {
  const {
    isSideBarOpen,
    activeSideBarLink,
    setActiveSideBarLink,
  } = React.useContext(MenuContext)
  const isLists = useMatch('/lists')
  console.log('SideBar -> isLists', isLists)
  const isProfile = useMatch('/profile')
  console.log('SideBar -> isProfile', isProfile)
  const isSettings = useMatch('/settings')
  console.log('SideBar -> isSettings', isSettings)

  React.useEffect(() => {
    if (isLists) {
      setActiveSideBarLink({ type: 'lists' })
    } else if (isProfile) {
      setActiveSideBarLink({ type: 'profile' })
    } else if (isSettings) {
      setActiveSideBarLink({ type: 'settings' })
    }
  }, [])

  // TODO: extract Link's to SideBarLink with children for icon
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
        <li
          sx={{
            color:
              activeSideBarLink.type === 'lists' ? 'text' : 'textSecondary',
            backgroundColor:
              activeSideBarLink.type === 'lists' ? 'colorThree' : 'transparent',
            padding: 2,
            '&:hover': {
              color: 'text',
              backgroundColor: 'colorThree',
            },
          }}
        >
          <Link
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              alignItems: 'center',
            }}
            tabIndex={0}
            to="/lists"
          >
            <AiOutlineUnorderedList
              sx={{
                paddingRight: 2,
              }}
              size="34"
            />
            Lists
          </Link>
        </li>
        <li
          sx={{
            color:
              activeSideBarLink.type === 'profile' ? 'text' : 'textSecondary',
            backgroundColor:
              activeSideBarLink.type === 'profile'
                ? 'colorThree'
                : 'transparent',
            padding: 2,
            '&:hover': {
              color: 'text',
              backgroundColor: 'colorThree',
            },
          }}
        >
          <Link
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              alignItems: 'center',
            }}
            tabIndex={0}
            to="/profile"
          >
            <AiOutlineProfile
              sx={{
                paddingRight: 2,
              }}
              size="34"
            />
            Profile
          </Link>
        </li>
        <li
          sx={{
            color:
              activeSideBarLink.type === 'settings' ? 'text' : 'textSecondary',
            backgroundColor:
              activeSideBarLink.type === 'settings'
                ? 'colorThree'
                : 'transparent',
            padding: 2,
            '&:hover': {
              color: 'text',
              backgroundColor: 'colorThree',
            },
          }}
        >
          <Link
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              alignItems: 'center',
            }}
            tabIndex={0}
            to="/settings"
          >
            <AiOutlineSetting
              sx={{
                paddingRight: 2,
              }}
              size="34"
            />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    <div />
  )
}

export default SideBar
