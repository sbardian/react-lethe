/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { StoreContext } from '../contexts/store-context/store-context'
import Lists from '../lists/lists'
import { UPDATE_USERNAME } from '../contexts/store-context/actions'
import toastsConfig from '../../utils/toasts-config'

export const GET_MY_LISTS = gql`
  {
    getMyInfo {
      id
      username
      lists {
        id
        title
      }
    }
  }
`

export const DELETE_LIST = gql`
  mutation deleteList($listId: String!) {
    deleteList(listId: $listId) {
      id
      title
    }
  }
`

export const LIST_DELETED = gql`
  subscription onListDeleted {
    listDeleted {
      id
      title
    }
  }
`

const deleteListSuccess = () =>
  toast.success('List deleted successfully', toastsConfig)
const deleteListFailure = (e) => toast.error(e.message, toastsConfig)

const ListsContainer = () => {
  const [, dispatch] = React.useContext(StoreContext)

  const { subscribeToMore, data: getListsData, loading, error } = useQuery(
    GET_MY_LISTS,
    {
      onCompleted: (successData) => {
        dispatch({
          type: UPDATE_USERNAME,
          payload: successData.getMyInfo.username,
        })
      },
    },
  )

  const [deleteList] = useMutation(DELETE_LIST, {
    onCompleted: () => {
      deleteListSuccess()
    },
    onError: (e) => {
      deleteListFailure(e)
    },
  })

  const handleDeleteList = (listId) => {
    deleteList({ variables: { listId } })
  }

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
  if (!getListsData) return <p>You currently have no lists. Create some!</p>

  subscribeToMore({
    document: LIST_DELETED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const { id } = subscriptionData.data.listDeleted
      if (prev.getMyInfo.lists.some((list) => list.id === id)) {
        const filteredLists = prev.getMyInfo.lists.filter(
          (list) => list.id !== id,
        )
        const newLists = {
          ...prev,
          getMyInfo: {
            ...prev.getMyInfo,
            lists: [...filteredLists],
          },
        }
        return newLists
      }
      return prev
    },
  })

  const { lists } = getListsData?.getMyInfo

  return (
    <div
      sx={{
        backgroundColor: 'colorTwo',
      }}
    >
      <Lists lists={lists} onDeleteList={handleDeleteList} />
    </div>
  )
}

export default ListsContainer
