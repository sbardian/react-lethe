/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useNavigate } from '@reach/router'
import Lists from '../lists/lists'
import alertConfig from '../../utils/alerts-config'

const ListsContainer = ({ show }) => {
  const navigate = useNavigate()

  const GET_MY_LISTS = gql`
    {
      getMyInfo {
        id
        lists {
          id
          title
          owner
        }
      }
    }
  `

  const DELETE_LIST = gql`
    mutation deleteList($listId: String!) {
      deleteList(listId: $listId) {
        id
        title
        owner
      }
    }
  `

  const LIST_DELETED = gql`
    subscription onListDeleted {
      listDeleted {
        id
        title
        owner
      }
    }
  `

  const { subscribeToMore, data: getListsData, loading, error } = useQuery(
    GET_MY_LISTS,
  )

  const [deleteList] = useMutation(DELETE_LIST, {
    onCompleted: () => {
      show({
        ...alertConfig,
        message: `List deleted successfully`,
        style: { backgroundColor: '#666', color: 'white' },
        progressBarColor: 'chartreuse',
      })
    },
    onError: (error) => {
      show({ ...alertConfig, message: error })
    },
    refetchQueries: [
      {
        query: GET_MY_LISTS,
      },
    ],
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

ListsContainer.propTypes = {
  show: PropTypes.func.isRequired,
}

export default ListsContainer
