/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { useParams } from 'react-router-dom'
import { MdAddCircle } from 'react-icons/md'
import PageLayout from '../components/page-layout/page-layout'
import { MenuContext } from '../components/contexts/menu-context/menu-context'
import Items from '../components/items/items'
import TabMenu from '../components/tab-menu/tab-menu'
import Dialog from '../components/dialogs/dialog'
import AddItemDialog from '../components/dialogs/add-item-dialog/add-item-dialog'
import ListSettingsButton from '../components/buttons/list-settings-button/list-settings-button'

const ListItemsRoute = () => {
  const { listId } = useParams()
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
        sx={{
          display: 'grid',
          gridTemplateRows: '85px 1fr',
          color: 'textSecondary',
          height: '100%',
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
          {showListItemTabs && <TabMenu />}
          <div
            sx={{
              display: 'grid',
              justifySelf: 'end',
              alignContent: 'end',
              gap: 3,
              gridTemplateColumns: '30px 30px',
              color: 'textSecondary',
              paddingBottom: 2,
            }}
          >
            <ListSettingsButton listId={listId} hoverColor="colorThree" />
            <MdAddCircle
              size="30"
              role="button"
              tabIndex={0}
              onClick={() => setShowDialog(!showDialog)}
              sx={{
                cursor: 'pointer',
                justifySelf: 'end',
                alignSelf: 'center',
                color: 'inherit',
                '&:hover': {
                  color: 'colorThree',
                },
              }}
            />
          </div>
        </div>
        <Items listId={listId} />
      </div>
      <Dialog showDialog={showDialog}>
        <AddItemDialog setShowDialog={setShowDialog} listId={listId} />
      </Dialog>
    </PageLayout>
  )
}

export default ListItemsRoute
