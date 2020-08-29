/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Link, useRouteMatch } from 'react-router-dom'
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

  const isActive = ({ isPartiallyCurrent, type }) => {
    if (isPartiallyCurrent) {
      setActiveSideBarLink(type)
    }
  }

  const isLists = useRouteMatch('/lists')
  const isProfile = useRouteMatch('/profile')
  const isSettings = useRouteMatch('/settings')

  React.useEffect(() => {
    if (isLists?.isExact) {
      setActiveSideBarLink({ type: 'lists' })
    } else if (isProfile?.isExact) {
      setActiveSideBarLink({ type: 'profile' })
    } else if (isSettings?.isExact) {
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
    <div />
  )
}

export default SideBar
