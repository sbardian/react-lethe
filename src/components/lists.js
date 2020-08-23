/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Link } from '@reach/router'
import { GiSettingsKnobs } from 'react-icons/gi'
import { FiDelete } from 'react-icons/fi'

const Lists = () => {
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

  const [deleteList, { data: deleteListData }] = useMutation(DELETE_LIST)

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
              gridTemplateColumns: '1fr',
              border: (theme) => `1px solid ${theme.colors.textSecondary}`,
              padding: '5px',
              color: 'textSecondary',
              paddingRight: 3,
              '@media (min-width:  800px)': {
                gridTemplateColumns: '1fr 30px 30px',
                gridTemplateRows: '40px',
              },
              '&:hover': {
                webkitBoxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                mozBoxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                boxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                backgroundColor: 'colorThree',
                color: 'text',
                border: '1px solid transparent',
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
              type="button"
              onClick={() => console.log('settings')}
              sx={{
                cursor: 'pointer',
                justifySelf: 'end',
                alignSelf: 'center',
              }}
            >
              <GiSettingsKnobs size="30" />
            </div>
            <div
              type="button"
              onClick={() => handleDeleteList(list.id)}
              sx={{
                cursor: 'pointer',
                justifySelf: 'end',
                alignSelf: 'center',
              }}
            >
              <FiDelete size="30" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Lists
