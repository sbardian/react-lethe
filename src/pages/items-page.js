/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { MdAddCircle } from 'react-icons/md'
import PageLayout from '../components/page-layout'
import { MenuContext } from '../components/menu-context'
import Items from '../components/items'
import TabMenu from '../components/tab-menu'
import Dialog, { useDialog } from '../components/dialog'
import AddItemDialog from '../components/add-item-dialog'

const ListItemsPage = ({ listId }) => {
  const { showDialog, setShowDialog } = useDialog()
  const { showListItemTabs, setShowListItemTabs } = React.useContext(
    MenuContext,
  )

  // TODO: fix this later...:)
  const [listTitle, setListTitle] = React.useState('')

  React.useEffect(() => {
    setShowListItemTabs(true)
    return () => {
      setShowListItemTabs(false)
    }
  }, [setShowListItemTabs])

  return (
    <PageLayout>
      <div
        sx={{
          display: 'grid',
          gridTemplateRows: '85px 1fr',
          color: 'textSecondary',
          padding: 3,
        }}
      >
        <div
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: '1fr 40px',
          }}
        >
          {showListItemTabs && <TabMenu listTitle={listTitle} />}
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
            onClick={() => setShowDialog(!showDialog)}
          >
            <MdAddCircle size="34" />
          </div>
        </div>
        <Items listId={listId} setListTitle={setListTitle} />
      </div>
      <Dialog setShowDialog={setShowDialog} showDialog={showDialog}>
        {({ setShowDialog }) => (
          <AddItemDialog setShowDialog={setShowDialog} listId={listId} />
        )}
      </Dialog>
    </PageLayout>
  )
}

export default ListItemsPage
