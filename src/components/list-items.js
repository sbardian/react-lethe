/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { gql, useQuery } from '@apollo/client'
import { Link } from '@reach/router'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { BsCheckBox } from 'react-icons/bs'
import { FiDelete } from 'react-icons/fi'
import { TiDeleteOutline } from 'react-icons/ti'

const ListItems = ({ listId }) => {
  const editItem = () => {
    console.log('EDIT ITEM')
  }

  const GET_LIST_ITEMS = gql`
    query getLists($id_is: String!) {
      getLists(id_is: $id_is) {
        id
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

  const { loading, error, data } = useQuery(GET_LIST_ITEMS, {
    variables: {
      id_is: listId,
    },
  })

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

  const [{ items }] = data?.getLists

  return (
    <ul
      css={css`
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fill, 200px);
        grid-template-rows: repeat(auto-fit, 100px);
        list-style: none;
        padding-left: 0;
        margin: 0;
        height: 100%;
      `}
    >
      {items &&
        items.map((item) => (
          <li
            key={item.id}
            css={css`
              display: grid;
              gap: 10px;
              grid-template-columns: 1fr;
              grid-template-rows: 1fr 1fr;
              border: 1px solid #666;
              padding: 20px;
              background-color: #f1f1f1;
              &:hover {
                -webkit-box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.66);
                -moz-box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.66);
                box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.66);
                cursor: pointer;
                background-color: #fff;
              }
            `}
          >
            <span>{item.title}</span>
            <div
              css={css`
                color: #666;
              `}
            >
              {item.status === true ? (
                <BsCheckBox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
              <TiDeleteOutline />
            </div>
          </li>
        ))}
    </ul>
  )
}

export default ListItems
