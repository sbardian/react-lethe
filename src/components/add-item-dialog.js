/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useMutation } from '@apollo/client'

const AddItemDialog = ({ setShowDialog, listId }) => {
  const [title, setTitle] = React.useState('')
  const [createItemError, setCreateItemError] = React.useState()

  const handleChange = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const ADD_ITEM = gql`
    mutation createNewItem($listId: String!, $title: String!) {
      createNewItem(ItemInfo: { list: $listId, title: $title }) {
        id
        title
        creator
        list
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
          creator
          list
          status
        }
      }
    }
  `

  const [createNewItem, { error }] = useMutation(ADD_ITEM, {
    onCompleted: () => setShowDialog(false),
  })

  if (error) {
    setCreateItemError(error.message)
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
      }}
    >
      <h2>Add Item</h2>
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
            gridTemplateColumns: '1fr',
            alignContent: 'start',
            marginTop: 3,
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
                createNewItem({
                  variables: { title, listId },
                  refetchQueries: [
                    {
                      query: GET_LIST_ITEMS,
                      variables: {
                        id_is: listId,
                      },
                    },
                  ],
                })
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

export default AddItemDialog
