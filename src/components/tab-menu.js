/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'

const TabMenu = () => {
  return (
    <nav
      css={css`
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        align-content: end;
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
            background-color: #e1e1e1;
            border: 1px solid #666;
            padding: 10px;
            color: #666;
          `}
        >
          Active
        </li>
        <li
          css={css`
            background-color: #e1e1e1;
            border: 1px solid #666;
            padding: 10px;
            color: #666;
          `}
        >
          Complete
        </li>
      </ol>
    </nav>
  )
}

export default TabMenu
