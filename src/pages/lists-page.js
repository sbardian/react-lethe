/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { RiPlayListAddLine } from 'react-icons/ri'
import PageLayout from '../components/page-layout'
import Lists from '../components/lists'

const ListsPage = () => {
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
          onClick={() => console.log('add list')}
        >
          <RiPlayListAddLine size="34" />
        </div>
        <Lists />
      </div>
    </PageLayout>
  )
}

export default ListsPage
