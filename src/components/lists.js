/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Link } from '@reach/router'
import { GiSettingsKnobs } from 'react-icons/gi'
import { FiDelete } from 'react-icons/fi'

const Lists = () => {
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
        css={css`
          color: #666;
        `}
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
      css={css`
        background-color: #e1e1e1;
      `}
    >
      <ul
        css={css`
          all: unset;
          display: grid;
          gap: 20px;
          list-style: none;
          padding: 20px;
        `}
      >
        {getListsData.getMyInfo.lists.map((list) => (
          <li
            key={list.id}
            css={css`
              display: grid;
              gap: 20px;
              grid-template-columns: 1fr;
              align-items: center;
              border: 1px solid #666;
              padding: 5px;
              color: #666;
              padding-right: 20px;
              @media (min-width: 800px) {
                grid-template-columns: 1fr 30px 30px;
                grid-template-rows: 40px;
              }
            `}
          >
            <Link
              to={`/list/${list.id}`}
              css={css`
                text-decoration: none;
              `}
            >
              <span
                css={css`
                  color: #666;
                `}
              >
                {list.title}
              </span>
            </Link>
            <div
              type="button"
              onClick={() => console.log('settings')}
              css={css`
                color: #666;
                cursor: pointer;
                justify-self: end;
              `}
            >
              <GiSettingsKnobs size="30" />
            </div>
            <div
              type="button"
              onClick={() => handleDeleteList(list.id)}
              css={css`
                color: #666;
                cursor: pointer;
                justify-self: end;
              `}
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
