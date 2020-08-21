/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useQuery, useMutation } from '@apollo/client'
import { BsCheckBox } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { RiCheckboxBlankLine } from 'react-icons/ri'
import Dialog, { useDialog } from '../components/dialog'
import EditItemDialog from './edit-item-dialog'
import { MenuContext } from './menu-context'

const ListItems = ({ listId, setListTitle }) => {
  const { showDialog, setShowDialog } = useDialog()
  const { activeItemTab } = React.useContext(MenuContext)
  const [displayedItems, setDisplayedItems] = React.useState()
  const [currentItem, setCurrentItem] = React.useState(null)

  const editItem = (item) => {
    setCurrentItem(item)
    setShowDialog(!showDialog)
  }

  const GET_LIST_ITEMS = gql`
    query getLists($id_is: String!) {
      getLists(id_is: $id_is) {
        title
        items {
          id
          title
          creator
          list
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
        creator
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
        creator
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
        creator
        list
        status
      }
    }
  `

  const ITEM_DELETED = gql`
    subscription onItemDeleted($listId: String!) {
      itemDeleted(listId: $listId) {
        id
        title
        creator
        list
        status
      }
    }
  `

  const ITEM_EDITED = gql`
    subscription onItemEdited($listId: String!) {
      itemEdited(listId: $listId) {
        id
        title
        creator
        list
        status
      }
    }
  `

  const { subscribeToMore, loading, error, data } = useQuery(GET_LIST_ITEMS, {
    variables: {
      id_is: listId,
    },
  })

  const [updateItem] = useMutation(UPDATE_ITEM_STATUS)
  const [deleteItem] = useMutation(DELETE_ITEM)

  React.useEffect(() => {
    if (data?.getLists[0]?.items) {
      const displayItems = data.getLists[0].items.filter((item) => {
        let result
        if (!activeItemTab) {
          if (!item.status) {
            result = true
          }
        } else {
          if (item.status) {
            result = true
          }
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
  if (error) return <p>{`ERROR: ${error}`}</p>
  if (!data) return <p>You currently have no lists. Create some!</p>

  const [{ title }] = data?.getLists
  setListTitle(title)

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

  return (
    <div
      sx={{
        backgroundColor: 'offWhite',
        margin: 0,
        height: '100%',
      }}
    >
      <ul
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fill, 200px)',
          listStyle: 'none',
          padding: 2,
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
                '&:hover': {
                  webkitBoxShadow: '0px 0px 10px -1px rgba(0, 0, 0, 0.66)',
                  mozBoxShadow: '0px 0px 10px -1px rgba(0, 0, 0, 0.66)',
                  boxShadow: '0px 0px 10px -1px rgba(0, 0, 0, 0.66)',
                  backgroundColor: 'colorThree',
                  color: 'text',
                },
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
                <span>{item.title}</span>
                <div
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(3, 40px)',
                    justifyContent: 'end',
                  }}
                >
                  <div
                    sx={{
                      alignSelf: 'end',
                    }}
                    onClick={() => {
                      updateItem({
                        refetchQueries: [
                          {
                            query: GET_LIST_ITEMS,
                            variables: {
                              id_is: listId,
                            },
                          },
                        ],
                        variables: {
                          itemId: item.id,
                          title: item.title,
                          status: !item.status,
                        },
                      })
                    }}
                  >
                    {item.status ? (
                      <BsCheckBox
                        size="30"
                        sx={{
                          color: 'green',
                          cursor: 'pointer',
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
                    sx={{
                      alignSelf: 'end',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'coral',
                      },
                    }}
                    onClick={() => {
                      editItem(item)
                    }}
                  >
                    <AiOutlineEdit size="30" />
                  </div>
                  <div
                    sx={{
                      alignSelf: 'end',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'crimson',
                      },
                    }}
                    onClick={() => {
                      deleteItem({
                        refetchQueries: [
                          {
                            query: GET_LIST_ITEMS,
                            variables: {
                              id_is: listId,
                            },
                          },
                        ],
                        variables: { itemId: item.id },
                      })
                    }}
                  >
                    <TiDeleteOutline size="30" />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <Dialog setShowDialog={setShowDialog} showDialog={showDialog}>
        {({ setShowDialog }) => (
          <EditItemDialog
            setShowDialog={setShowDialog}
            item={currentItem}
            listId={listId}
          />
        )}
      </Dialog>
    </div>
  )
}

export default ListItems
