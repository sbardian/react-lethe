/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'

const EditItem = ({ itemId }) => {
  console.log('itemId: ', itemId)
  return (
    <div
      css={css`
        background-color: #e1e1e1;
      `}
    >
      <div
        css={css`
          padding: 20px;
        `}
      >
        {`Edit item id: ${itemId}`}
      </div>
    </div>
  )
}

export default EditItem
