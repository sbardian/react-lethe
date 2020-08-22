/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useQuery, useMutation } from '@apollo/client'

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
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: '1fr',
        border: ({ colors }) => `1px solid ${colors.offWhite}`,
        backgroundColor: 'backgroundSecondary',
        margin: 3,
        padding: 3,
        color: 'text',
      }}
    >
      <h2>Edit Item</h2>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          fontSize: 1,
        }}
      >
        <label
          htmlFor="title"
          sx={{
            alignSelf: 'end',
            color: 'text',
          }}
        >
          Title
        </label>
        <input
          sx={{
            color: 'textSecondary',
            borderRadius: '5px',
            fontSize: 0,
            '@media (min-width: 430px)': {
              fontSize: 1,
            },
          }}
          name="title"
          type="text"
          id="title"
          value={title}
          autoFocus
          onChange={(event) => handleChange(event)}
        />
        <div
          sx={{
            display: 'grid',
            gap: 3,
            alignContent: 'start',
            marginTop: 3,
            gridTemplateColumns: '1fr',
            '@media (min-width: 430px)': {
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'auto',
            },
          }}
        >
          <button
            type="submit"
            sx={{
              all: 'unset',
              padding: 2,
              borderRadius: '10px',
              fontSize: 3,
              boxShadow: 'none',
              backgroundColor: 'colorThree',
              color: 'text',
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
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
            sx={{
              all: 'unset',
              padding: 2,
              borderRadius: '10px',
              fontSize: 3,
              boxShadow: 'none',
              backgroundColor: 'none',
              color: 'text',
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
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
