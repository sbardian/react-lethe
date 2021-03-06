/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { RiPlayListAddLine } from 'react-icons/ri'
import PageLayout from '../components/page-layout/page-layout'
import ListsContainer from '../components/lists-container/lists-container'
import AddListDialog from '../components/dialogs/add-list-dialog/add-list-dialog'
import Dialog from '../components/dialogs/dialog'
import handleKeyPress from '../utils/on-key-press'

const ListsRoute = () => {
  const [showDialog, setShowDialog] = React.useState(false)

  return (
    <PageLayout>
      <div
        sx={{
          display: 'grid',
          gridTemplateRows: '40px 1fr',
          color: 'textDark',
          padding: 3,
          height: '100%',
          width: '100%',
        }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-pressed="false"
          aria-label="add list"
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
          onKeyPress={(event) => {
            handleKeyPress(event, () => setShowDialog(!showDialog))
          }}
          onClick={() => {
            setShowDialog(!showDialog)
          }}
        >
          <RiPlayListAddLine size="34" />
        </div>
        <ListsContainer />
      </div>
      <Dialog showDialog={showDialog}>
        <AddListDialog setShowDialog={setShowDialog} />
      </Dialog>
    </PageLayout>
  )
}

export default ListsRoute
