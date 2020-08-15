/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { gql, useQuery } from '@apollo/client'

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

  const { data, loading, error } = useQuery(GET_MY_LISTS)

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
  if (!data) return <p>You currently have no lists. Create some!</p>

  console.log('data: ', data)

  return (
    <div>
      <ul
        css={css`
          list-style: none;
          padding-left: 0;
        `}
      >
        {data.getMyInfo.lists.map((list) => (
          <li
            key={list.id}
            css={css`
              border: 1px solid #666;
              padding: 5px;
              color: #666;
            `}
          >
            {list.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Lists
