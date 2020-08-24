/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Link, useNavigate } from '@reach/router'
import { FiDelete } from 'react-icons/fi'
import ListSettingsButton from './list-settings-button'

const Lists = () => {
  const navigate = useNavigate()

  const GET_MY_LISTS = gql`
    {
      getMyInfo {
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

  const [deleteList, { data: deleteListData }] = useMutation(DELETE_LIST, {
    onError: (error) => {
      // TODO: time to implement alerts!
      console.log('Show alert')
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
  if (error) return <p>{`ERROR: ${error}`}</p>
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

  return (
    <div
      sx={{
        backgroundColor: 'colorTwo',
      }}
    >
      <ul
        sx={{
          all: 'unset',
          display: 'grid',
          gap: 3,
          listStyle: 'none',
          padding: 3,
        }}
      >
        {getListsData.getMyInfo.lists.map((list) => (
          <li
            key={list.id}
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: '1fr 30px',
              border: (theme) => `1px solid ${theme.colors.textSecondary}`,
              backgroundColor: 'offWhite',
              padding: '5px',
              color: 'textSecondary',
              paddingRight: 3,
              '&:hover': {
                webkitBoxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                mozBoxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                boxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                backgroundColor: 'colorThree',
                color: 'text',
                border: '1px solid transparent',
              },
              '@media (min-width: 800px)': {
                gridTemplateColumns: '1fr 80px',
              },
            }}
          >
            <Link
              to={`/list/${list.id}`}
              sx={{
                textDecoration: 'none',
                height: '100%',
                alignContent: 'center',
                display: 'grid',
                marginLeft: 3,
                color: 'inherit',
              }}
            >
              <span>{list.title}</span>
            </Link>
            <div
              sx={{
                display: 'grid',
                gap: 3,
                '@media (min-width: 800px)': {
                  gridTemplateColumns: '30px 30px',
                },
              }}
            >
              <ListSettingsButton listId={list.id} hoverColor="text" />
              <div
                type="button"
                onClick={() => handleDeleteList(list.id)}
                sx={{
                  display: 'grid',
                  cursor: 'pointer',
                  justifySelf: 'end',
                  alignSelf: 'center',
                }}
              >
                <FiDelete size="30" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Lists
