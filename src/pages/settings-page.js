/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import PageLayout from '../components/page-layout'
import Settings from '../components/settings'

const SettingsPage = () => {
  return (
    <PageLayout>
      <div
        css={css`
          color: #666;
          padding: 20px;
          display: grid;
          grid-template-columns: 1fr;
        `}
      >
        <Settings />
      </div>
    </PageLayout>
  )
}

export default SettingsPage
