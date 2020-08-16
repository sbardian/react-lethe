/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import PageLayout from '../components/page-layout'
import EditItem from '../components/edit-item'

const EditItemPage = ({ itemId }) => {
  return (
    <PageLayout>
      <div
        css={css`
          color: #666;
          padding: 20px;
          display: grid;
          grid-template-rows: 1fr;
        `}
      >
        <EditItem itemId={itemId} />
      </div>
    </PageLayout>
  )
}

export default EditItemPage
