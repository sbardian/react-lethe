/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PageLayout from '../components/page-layout'
import ListSettings from '../components/list-settings'

const ListSettingsRoute = ({ listId }) => {
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
        <ListSettings listId={listId} />
      </div>
    </PageLayout>
  )
}

export default ListSettingsRoute
