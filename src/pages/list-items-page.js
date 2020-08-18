/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { MdPlaylistAdd } from 'react-icons/md'
import PageLayout from '../components/page-layout'
import { MenuContext } from '../components/menu-context'
import ListItems from '../components/list-items'
import TabMenu from '../components/tab-menu'
import Dialog, { useDialog } from '../components/dialog'
import AddItemDialog from '../components/add-item-dialog'

const ListItemsPage = ({ listId }) => {
  const { showDialog, setShowDialog } = useDialog()
  const { showListItemTabs, setShowListItemTabs } = React.useContext(
    MenuContext,
  )
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
        css={css`
          color: #666;
          padding: 20px;
          display: grid;
          grid-template-rows: 75px 1fr;
        `}
      >
        <div
          css={css`
            display: grid;
            gap: 20px;
            grid-template-columns: 1fr 40px;
          `}
        >
          {showListItemTabs && <TabMenu listTitle={listTitle} />}
          <div
            css={css`
              display: grid;
              color: #4ababa;
              justify-items: end;
              cursor: pointer;
            `}
            onClick={() => setShowDialog(!showDialog)}
          >
            <MdPlaylistAdd size="34" />
          </div>
        </div>
        <ListItems listId={listId} setListTitle={setListTitle} />
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
