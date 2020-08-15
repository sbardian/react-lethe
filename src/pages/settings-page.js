/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import PageLayout from '../components/page-layout'

const SettingsPage = () => {
  return (
    <PageLayout>
      <div
        css={css`
          background-color: #e1e1e1;
          color: #666;
          margin: 20px;
          padding: 20px;
        `}
      >
        Settings
      </div>
    </PageLayout>
  )
}

export default SettingsPage
