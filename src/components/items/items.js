/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { gql, useQuery, useMutation } from '@apollo/client'
import { BsCheck2Square } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { RiCheckboxBlankLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import Dialog from '../dialogs/dialog'
import EditItemDialog from '../dialogs/edit-item-dialog/edit-item-dialog'
import { MenuContext } from '../contexts/menu-context/menu-context'
import { StoreContext } from '../contexts/store-context/store-context'
import { StorageContext } from '../contexts/storage-context/storage-context'
import handleKeyPress from '../../utils/on-key-press'
import { UPDATE_CURRENT_LIST_TITLE } from '../contexts/store-context/actions'
import toastsConfig from '../../utils/toasts-config'
import ProfileImage from '../profile-image/profile-image'

const GET_LIST_ITEMS = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      title
      items {
        id
        title
        creator {
          id
          username
          profileImageUrl
        }
        status
      }
    }
  }
`

const UPDATE_ITEM_STATUS = gql`
  mutation updateItem($itemId: String!, $title: String!, $status: Boolean!) {
    updateItem(itemId: $itemId, title: $title, status: $status) {
      id
      title
      creator {
        id
      }
      list
      status
    }
  }
`

const DELETE_ITEM = gql`
  mutation deleteItem($itemId: String!) {
    deleteItem(itemId: $itemId) {
      id
      title
      creator {
        id
      }
      list
      status
    }
  }
`

const ITEM_ADDED = gql`
  subscription onItemAdded($listId: String!) {
    itemAdded(listId: $listId) {
      id
      title
      creator {
        id
      }
      status
    }
  }
`

const ITEM_DELETED = gql`
  subscription onItemDeleted($listId: String!) {
    itemDeleted(listId: $listId) {
      id
      title
      creator {
        id
      }
      status
    }
  }
`

const ITEM_EDITED = gql`
  subscription onItemEdited($listId: String!) {
    itemEdited(listId: $listId) {
      id
      title
      creator {
        id
      }
      status
    }
  }
`

const updateItemStatusFailure = (e) => toast.error(e.message, toastsConfig)
const deleteItemFailure = (e) => toast.error(e.message, toastsConfig)

const ListItems = ({ listId }) => {
  const [showDialog, setShowDialog] = React.useState(false)
  const { activeItemTab } = React.useContext(MenuContext)
  const { getImageUrl } = React.useContext(StorageContext)
  const [, dispatch] = React.useContext(StoreContext)
  const [displayedItems, setDisplayedItems] = React.useState()
  const [currentItem, setCurrentItem] = React.useState(null)

  const editItem = (item) => {
    setCurrentItem(item)
    setShowDialog(!showDialog)
  }

  const { subscribeToMore, loading, error, data } = useQuery(GET_LIST_ITEMS, {
    variables: {
      id_is: listId,
    },
    onCompleted: (successData) => {
      const [list] = successData.getLists
      dispatch({
        type: UPDATE_CURRENT_LIST_TITLE,
        payload: list.title,
      })
    },
  })

  const [updateItem] = useMutation(UPDATE_ITEM_STATUS, {
    onError: (updateItemError) => {
      updateItemStatusFailure(updateItemError)
    },
  })

  const [deleteItem] = useMutation(DELETE_ITEM, {
    onError: (deleteItemError) => {
      deleteItemFailure(deleteItemError)
    },
  })

  React.useEffect(() => {
    if (data?.getLists[0]?.items) {
      const displayItems = data.getLists[0].items.filter((item) => {
        let result
        if (!activeItemTab && !item.status) {
          result = true
        } else if (activeItemTab && item.status) {
          result = true
        }
        return result
      })
      setDisplayedItems(displayItems)
    }
  }, [data, activeItemTab])

  if (loading)
    return (
      <p
        sx={{
          color: 'textSecondary',
        }}
      >
        Loading...
      </p>
    )
  if (error) return <p>{`${error}`}</p>
  if (!data) return <p>You currently have no lists. Create some!</p>

  subscribeToMore({
    document: ITEM_ADDED,
    variables: { listId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const { id } = subscriptionData.data.itemAdded
      const [list] = prev.getLists
      if (!list.items.some((item) => item.id === id)) {
        const newItems = {
          ...prev,
          getLists: [
            {
              ...list,
              items: [{ ...subscriptionData.data.itemAdded }, ...list.items],
            },
          ],
        }
        return newItems
      }
      return prev
    },
  })

  subscribeToMore({
    document: ITEM_DELETED,
    variables: { listId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const { id } = subscriptionData.data.itemDeleted
      const [list] = prev.getLists
      if (list.items.some((item) => item.id === id)) {
        const filteredItems = list.items.filter((item) => item.id !== id)
        const newItems = {
          ...prev,
          getLists: [
            {
              ...list,
              items: [...filteredItems],
            },
          ],
        }
        return newItems
      }
      return prev
    },
  })

  subscribeToMore({
    document: ITEM_EDITED,
    variables: { listId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const { id } = subscriptionData.data.itemEdited
      const [list] = prev.getLists
      if (list.items.some((item) => item.id === id)) {
        const noneEditItems = list.items.filter((item) => item.id !== id)
        const newItems = {
          ...prev,
          getLists: [
            {
              ...list,
              items: [
                ...noneEditItems,
                { ...subscriptionData.data.itemEdited },
              ],
            },
          ],
        }
        return newItems
      }
      return prev
    },
  })

  const handleUpdateItem = (item) => {
    updateItem({
      variables: {
        itemId: item.id,
        title: item.title,
        status: !item.status,
      },
    })
  }

  const handleDeleteItem = (item) => {
    deleteItem({
      variables: { itemId: item.id },
    })
  }

  return (
    <div
      sx={{
        backgroundColor: 'colorTwo',
        margin: 0,
      }}
    >
      <ul
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fill, 200px)',
          listStyle: 'none',
          padding: 3,
        }}
      >
        {displayedItems &&
          displayedItems.map((item) => (
            <li
              key={item.id}
              sx={{
                border: ({ colors }) => `1px solid ${colors.textSecondary}`,
                backgroundColor: 'offWhite',
                padding: 2,
              }}
            >
              <div
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gridTemplateRows: '1fr 1fr',
                  height: '100%',
                  width: '100%',
                }}
              >
                <div
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '75px 1fr',
                    gap: 2,
                  }}
                >
                  <ProfileImage
                    profileImageUrl={item.creator.profileImageUrl}
                    size="small"
                    type="circle"
                    alt="Profile Image"
                  />
                  <span sx={{ fontWeight: 'heavy' }}>{item.title}</span>
                </div>
                <div
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(3, 40px)',
                    justifyContent: 'end',
                  }}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    sx={{
                      alignSelf: 'end',
                    }}
                    onKeyPress={(event) => {
                      handleKeyPress(event, () => handleUpdateItem(item))
                    }}
                    onClick={() => {
                      handleUpdateItem(item)
                    }}
                  >
                    {item.status ? (
                      <BsCheck2Square
                        size="30"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'chartreuse',
                          },
                        }}
                      />
                    ) : (
                      <RiCheckboxBlankLine
                        size="30"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'chartreuse',
                          },
                        }}
                      />
                    )}
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    sx={{
                      alignSelf: 'end',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'coral',
                      },
                    }}
                    onKeyPress={(event) => {
                      handleKeyPress(event, () => editItem(item))
                    }}
                    onClick={() => {
                      editItem(item)
                    }}
                  >
                    <AiOutlineEdit size="30" />
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    sx={{
                      alignSelf: 'end',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'crimson',
                      },
                    }}
                    onKeyPress={(event) => {
                      handleKeyPress(event, () => handleDeleteItem(item))
                    }}
                    onClick={() => {
                      handleDeleteItem(item)
                    }}
                  >
                    <TiDeleteOutline size="30" />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <Dialog showDialog={showDialog}>
        <EditItemDialog
          setShowDialog={setShowDialog}
          item={currentItem}
          listId={listId}
        />
      </Dialog>
    </div>
  )
}

ListItems.propTypes = {
  listId: PropTypes.string.isRequired,
}

export default ListItems
