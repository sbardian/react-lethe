/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PageLayout from '../components/page-layout'
import Settings from '../components/settings'

const SettingsPage = () => {
  return (
    <PageLayout>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          padding: 3,
          color: 'textSecondary',
        }}
      >
        <Settings />
      </div>
    </PageLayout>
  )
}

export default SettingsPage
