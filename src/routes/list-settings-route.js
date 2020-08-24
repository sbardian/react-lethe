/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { MdArrowBack } from 'react-icons/md'
import PageLayout from '../components/page-layout'
import ListSettings from '../components/list-settings'
import GoBack from '../components/go-back'

const ListSettingsRoute = ({ listId }) => {
  return (
    <PageLayout>
      <div
        sx={{
          display: 'grid',
          gridTemplateRows: '35px 1fr',
          color: 'textSecondary',
          padding: 3,
        }}
      >
        <GoBack>
          <MdArrowBack size="30" />
        </GoBack>
        <ListSettings listId={listId} />
      </div>
    </PageLayout>
  )
}

export default ListSettingsRoute
