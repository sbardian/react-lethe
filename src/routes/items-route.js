/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { MdAddCircle } from 'react-icons/md'
import { AlertWrapper } from 'react-alerts-plus'
import PageLayout from '../components/page-layout/page-layout'
import { MenuContext } from '../components/contexts/menu-context/menu-context'
import Items from '../components/items/items'
import TabMenu from '../components/tab-menu/tab-menu'
import Dialog, { useDialog } from '../components/dialogs/dialog'
import AddItemDialog from '../components/dialogs/add-item-dialog/add-item-dialog'
import ListSettingsButton from '../components/buttons/list-settings-button/list-settings-button'

const ListItemsRoute = ({ listId }) => {
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
      <AlertWrapper>
        {({ show }) => (
          <React.Fragment>
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
                    gap: 3,
                    gridTemplateColumns: '30px 30px',
                    color: 'textSecondary',
                    paddingBottom: 2,
                  }}
                >
                  <ListSettingsButton listId={listId} hoverColor="colorThree" />
                  <MdAddCircle
                    size="30"
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
              <Items listId={listId} setListTitle={setListTitle} show={show} />
            </div>
            <Dialog setShowDialog={setShowDialog} showDialog={showDialog}>
              {({ setShowDialog }) => (
                <AddItemDialog
                  setShowDialog={setShowDialog}
                  listId={listId}
                  show={show}
                />
              )}
            </Dialog>
          </React.Fragment>
        )}
      </AlertWrapper>
    </PageLayout>
  )
}

export default ListItemsRoute
