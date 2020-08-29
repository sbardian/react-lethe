/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { RiPlayListAddLine } from 'react-icons/ri'
import { AlertWrapper } from 'react-alerts-plus'
import PageLayout from '../components/page-layout/page-layout'
import ListsContainer from '../components/lists-container/lists-container'
import AddListDialog from '../components/dialogs/add-list-dialog/add-list-dialog'
import Dialog from '../components/dialogs/dialog'

const ListsRoute = () => {
  const [showDialog, setShowDialog] = React.useState(false)

  console.log('in lists route')

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
                role="button"
                tabIndex={0}
                aria-pressed="false"
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
                onKeyPress={() => {
                  setShowDialog(!showDialog)
                }}
                onClick={() => {
                  setShowDialog(!showDialog)
                }}
              >
                <RiPlayListAddLine size="34" />
              </div>
              <ListsContainer show={show} />
            </div>
            <Dialog showDialog={showDialog}>
              <AddListDialog setShowDialog={setShowDialog} show={show} />
            </Dialog>
          </React.Fragment>
        )}
      </AlertWrapper>
    </PageLayout>
  )
}

export default ListsRoute
