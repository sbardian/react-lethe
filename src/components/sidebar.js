/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Link, useMatch } from '@reach/router'
import {
  AiOutlineUnorderedList,
  AiOutlineProfile,
  AiOutlineSetting,
} from 'react-icons/ai'
import { MenuContext } from './menu-context'

const SideBar = () => {
  const {
    isSideBarOpen,
    activeSideBarLink,
    setActiveSideBarLink,
  } = React.useContext(MenuContext)

  const isActive = (props) => {
    if (props.isPartiallyCurrent) {
      setActiveSideBarLink(props.type)
    }
  }

  const isLists = useMatch('list')
  const isProfile = useMatch('profile')
  const isSettings = useMatch('settings')

  React.useEffect(() => {
    if (isLists) {
      setActiveSideBarLink({ type: 'lists' })
    } else if (isProfile) {
      setActiveSideBarLink({ type: 'profile' })
    } else if (isSettings) {
      setActiveSideBarLink({ type: 'settings' })
    }
  }, [])

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
            color: activeSideBarLink === 'lists' ? 'text' : 'textSecondary',
            backgroundColor:
              activeSideBarLink === 'lists' ? 'colorThree' : 'transparent',
            padding: 2,
            '&:hover': {
              color: 'text',
              backgroundColor: 'colorThree',
            },
          }}
          to="/lists"
          getProps={(props) => isActive({ ...props, type: 'lists' })}
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
            color: activeSideBarLink === 'profile' ? 'text' : 'textSecondary',
            backgroundColor:
              activeSideBarLink === 'profile' ? 'colorThree' : 'transparent',
            padding: 2,
            '&:hover': {
              color: 'text',
              backgroundColor: 'colorThree',
            },
          }}
          to="/profile"
          getProps={(props) => isActive({ ...props, type: 'profile' })}
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
            color: activeSideBarLink === 'settings' ? 'text' : 'textSecondary',
            backgroundColor:
              activeSideBarLink === 'settings' ? 'colorThree' : 'transparent',
            padding: 2,
            '&:hover': {
              color: 'text',
              backgroundColor: 'colorThree',
            },
          }}
          to="/settings"
          getProps={(props) => isActive({ ...props, type: 'settings' })}
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
