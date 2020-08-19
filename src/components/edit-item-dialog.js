/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { jsx, css } from '@emotion/core'

const EditItemDialog = ({ item, listId, setShowDialog }) => {
  const [title, setTitle] = React.useState(item.title)
  const [createItemError, setEditItemError] = React.useState()

  const UPDATE_ITEM = gql`
    mutation updateItem($itemId: String!, $title: String!, $status: Boolean!) {
      updateItem(itemId: $itemId, title: $title, status: $status) {
        id
        title
        list
        creator
        status
      }
    }
  `

  const GET_LIST_ITEMS = gql`
    query getLists($id_is: String!) {
      getLists(id_is: $id_is) {
        id
        title
        items {
          id
          title
          list
          creator
          status
        }
      }
    }
  `

  const handleChange = (event) => {
    event.preventDefault()
    const { value } = event.target
    setTitle(value)
  }

  const [updateItem, { error }] = useMutation(UPDATE_ITEM, {
    refetchQueries: [
      {
        query: GET_LIST_ITEMS,
        variables: {
          id_is: listId,
        },
      },
    ],
    variables: {
      title,
      itemId: item.id,
      status: item.status,
    },
    awaitRefetchQueries: true,
  })

  if (error) {
    setEditItemError(error.message)
  }

  return (
    <div
      css={css`
        display: grid;
        gap: 20px;
        grid-template-columns: 1fr;
        border: 1px solid white;
        background-color: #666;
        margin: 20px;
        padding: 20px;
        color: white;
      `}
    >
      <h2>Edit Item</h2>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr;
          font-size: 1.5rem;
        `}
      >
        <label
          htmlFor="title"
          css={css`
            align-self: end;
            color: white;
          `}
        >
          Title
        </label>
        <input
          css={css`
            color: #666;
            border-radius: 5px;
            font-size: 0.9rem;
            height: 2rem;
            @media (min-width: 430px) {
              font-size: 1.5rem;
            }
          `}
          name="title"
          type="text"
          id="title"
          value={title}
          autoFocus
          onChange={(event) => handleChange(event)}
        />
        <div
          css={css`
            display: grid;
            gap: 20px;
            align-content: start;
            margin-top: 20px;
            grid-template-columns: 1fr;
            @media (min-width: 430px) {
              grid-template-columns: 1fr 1fr;
              grid-template-rows: auto;
            }
          `}
        >
          <button
            type="submit"
            css={css`
              all: unset;
              padding: 10px;
              border-radius: 10px;
              font-size: 2rem;
              box-shadow: none;
              background-color: #4ababa;
              color: white;
              display: flex;
              justify-content: center;
              cursor: pointer;
            `}
            onClick={() => {
              if (title) {
                updateItem()
                setShowDialog(false)
              }
            }}
          >
            Submit
          </button>
          <button
            type="submit"
            css={css`
              all: unset;
              padding: 10px;
              border-radius: 10px;
              font-size: 2rem;
              box-shadow: none;
              color: white;
              display: flex;
              justify-content: center;
              cursor: pointer;
            `}
            onClick={() => {
              setShowDialog(false)
            }}
          >
            Cancel
          </button>
          {createItemError && (
            <div>{`Error creating item: ${createItemError}`}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditItemDialog
