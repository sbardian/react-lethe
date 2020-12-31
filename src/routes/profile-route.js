/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PageLayout from '../components/page-layout/page-layout'
import Profile from '../components/profile/profile'

const ProfileRoute = () => (
  <PageLayout>
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        padding: 3,
        color: 'textSecondary',
      }}
    >
      <Profile />
    </div>
  </PageLayout>
)

export default ProfileRoute
