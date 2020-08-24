/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { RiPlayListAddLine } from 'react-icons/ri'
import { AlertWrapper } from 'react-alerts-plus'
import PageLayout from '../components/page-layout'
import Lists from '../components/lists'
import AddListDialog from '../components/add-list-dialog'
import Dialog, { useDialog } from '../components/dialog'

const ListsRoute = () => {
  const { showDialog, setShowDialog } = useDialog()

  return (
    <PageLayout>
      <AlertWrapper>
        {({ show }) => (
          <React.Fragment>
            <div
              sx={{
                display: 'grid',
                gridTemplateRows: '40px 1fr',
                color: 'textDark',
                padding: 3,
              }}
            >
              <div
                sx={{
                  display: 'grid',
                  justifySelf: 'end',
                  alignContent: 'end',
                  color: 'textSecondary',
                  cursor: 'pointer',
                  paddingBottom: 1,
                  '&:hover': {
                    color: 'colorThree',
                  },
                }}
                onClick={() => {
                  setShowDialog(!showDialog)
                }}
              >
                <RiPlayListAddLine size="34" />
              </div>
              <Lists show={show} />
            </div>
            <Dialog setShowDialog={setShowDialog} showDialog={showDialog}>
              {({ setShowDialog }) => (
                <AddListDialog setShowDialog={setShowDialog} show={show} />
              )}
            </Dialog>
          </React.Fragment>
        )}
      </AlertWrapper>
    </PageLayout>
  )
}

export default ListsRoute
