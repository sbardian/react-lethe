/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { MdPlaylistAdd } from 'react-icons/md'
import PageLayout from '../components/page-layout'
import { MenuContext } from '../components/menu-context'
import ListItems from '../components/list-items'
import TabMenu from '../components/tab-menu'
import AddItemDialog from '../components/add-item-dialog'

const ListItemsPage = ({ listId }) => {
  const [showDialog, setShowDialog] = React.useState(false)
  const { showListItemTabs, setShowListItemTabs } = React.useContext(
    MenuContext,
  )

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
          grid-template-rows: 40px 1fr;
        `}
      >
        <div
          css={css`
            display: grid;
            gap: 20px;
            grid-template-columns: 1fr 1fr;
          `}
        >
          {showListItemTabs && <TabMenu />}
          <div
            css={css`
              display: grid;
              color: #4ababa;
              justify-items: end;
            `}
          >
            <MdPlaylistAdd
              size="34"
              onClick={() => setShowDialog(!showDialog)}
            />
          </div>
        </div>
        <ListItems listId={listId} />
      </div>
      {showDialog && (
        <AddItemDialog setShowDialog={setShowDialog} listId={listId} />
      )}
    </PageLayout>
  )
}

export default ListItemsPage
