/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PageLayout from '../components/page-layout/page-layout'
import Invitations from '../components/invitations/invitations'

const InvitationsRoute = () => {
  return (
    <PageLayout>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          padding: 3,
          color: 'textSecondary',
          height: '100%',
        }}
      >
        <Invitations />
      </div>
    </PageLayout>
  )
}

export default InvitationsRoute
