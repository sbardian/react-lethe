/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import PageLayout from '../components/page-layout'
import { MenuContext } from '../components/menu-context'
import ListItems from '../components/list-items'
import TabMenu from '../components/tab-menu'

const ListItemsPage = ({ listId }) => {
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
        <div>{showListItemTabs && <TabMenu />}</div>
        <ListItems listId={listId} />
      </div>
    </PageLayout>
  )
}

export default ListItemsPage
