/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'

const Dialog = ({ children, showDialog, setShowDialog }) => {
  const bag = {
    showDialog,
    setShowDialog,
  }

  return (
    <React.Fragment>
      {showDialog && (
        <div
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            @media (min-width: 800px) {
              width: 600px;
            }
          `}
        >
          {children(bag)}
        </div>
      )}
    </React.Fragment>
  )
}

export default Dialog

export const useDialog = () => {
  const [showDialog, setShowDialog] = React.useState(false)

  const bag = {
    showDialog,
    setShowDialog,
  }

  return bag
}
