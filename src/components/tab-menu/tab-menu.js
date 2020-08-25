/* eslint-disable no-unused-vars */
/** @jsx jsx */
import { act } from '@testing-library/react'
import React from 'react'
import { jsx } from 'theme-ui'
import { MenuContext } from '../contexts/menu-context/menu-context'

const TabMenu = ({ listTitle }) => {
  const { activeItemTab, setActiveItemTab } = React.useContext(MenuContext)

  return (
    <nav
      sx={{
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto auto',
        alignContent: 'end',
      }}
    >
      <span
        sx={{
          fontSize: 1,
          color: 'textSecondary',
          marginBottom: '5px',
        }}
      >
        {listTitle}
      </span>
      <ol
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyle: 'none',
          margin: 0,
          paddingLeft: 0,
          gap: 2,
        }}
      >
        <li
          sx={{
            borderBottom: 'none',
            padding: 3,
            color: 'textSecondary',
            backgroundColor: !activeItemTab ? 'colorTwo' : 'offWhite',
            cursor: 'pointer',
          }}
          onClick={() => setActiveItemTab(false)}
        >
          Active
        </li>
        <li
          sx={{
            borderBottom: 'none',
            padding: 3,
            color: 'textSecondary',
            backgroundColor: activeItemTab ? 'colorTwo' : 'offWhite',
            cursor: 'pointer',
          }}
          onClick={() => setActiveItemTab(true)}
        >
          Complete
        </li>
      </ol>
    </nav>
  )
}

export default TabMenu
