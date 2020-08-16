/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import PageLayout from '../components/page-layout'
import ListItems from '../components/list-items'

const ListPage = ({ listId }) => {
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
        <ListItems listId={listId} />
      </div>
    </PageLayout>
  )
}

export default ListPage
