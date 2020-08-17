/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { MenuContext } from './menu-context'

const TabMenu = ({ listTitle }) => {
  const { activeItemTab, setActiveItemTab } = React.useContext(MenuContext)

  console.log('listTitle: ', listTitle)

  return (
    <nav
      css={css`
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        align-content: end;
        margin: 0 20px 0 20px;
      `}
    >
      <ol
        css={css`
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          margin: 0;
          padding-left: 0;
          gap: 10px;
        `}
      >
        <li
          css={css`
            padding: 10px 10px 10px 0;
          `}
        >
          <span
            css={css`
              font-size: 1.2rem;
              color: white;
            `}
          >
            {listTitle}
          </span>
        </li>
        <li
          css={css`
            background-color: #e1e1e1;
            border: 1px solid #666;
            border-bottom: none;
            padding: 10px;
            color: ${!activeItemTab ? '#666' : 'white'};
            cursor: pointer;
            background-color: ${!activeItemTab ? '#e1e1e1' : '#4ababa20'};
          `}
          onClick={() => setActiveItemTab(false)}
        >
          Active
        </li>
        <li
          css={css`
            background-color: #e1e1e1;
            border: 1px solid #666;
            border-bottom: none;
            padding: 10px;
            color: ${activeItemTab ? '#666' : 'white'};
            cursor: pointer;
            background-color: ${activeItemTab ? '#e1e1e1' : '#4ababa20'};
          `}
          onClick={() => setActiveItemTab(true)}
        >
          Complete
        </li>
      </ol>
    </nav>
  )
}

export default TabMenu
