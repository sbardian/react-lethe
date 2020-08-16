/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import PageLayout from '../components/page-layout'
import { MenuContext } from '../components/menu-context'
import ListItems from '../components/list-items'

const ListItemsPage = ({ listId }) => {
  const { setShowListItemTabs } = React.useContext(MenuContext)

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
          background-color: #e1e1e1;
          color: #666;
          margin: 5px 20px 20px 20px;
          padding: 20px;
        `}
      >
        <ListItems listId={listId} />
      </div>
    </PageLayout>
  )
}

export default ListItemsPage
