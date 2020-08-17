/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { RiPlayListAddLine } from 'react-icons/ri'
import PageLayout from '../components/page-layout'
import Lists from '../components/lists'
import AddListDialog from '../components/add-list-dialog'

const ListsPage = () => {
  const [showDialog, setShowDialog] = React.useState(false)

  return (
    <PageLayout>
      <div
        css={css`
          color: #666;
          padding: 20px;
          display: grid;
          grid-template-rows: 40px 1fr;
        `}
      >
        <div
          css={css`
            justify-self: end;
            color: #4ababa;
            cursor: pointer;
          `}
          onClick={() => setShowDialog(!showDialog)}
        >
          <RiPlayListAddLine size="34" />
        </div>
        <Lists />
      </div>
      {showDialog && <AddListDialog setShowDialog={setShowDialog} />}
    </PageLayout>
  )
}

export default ListsPage
