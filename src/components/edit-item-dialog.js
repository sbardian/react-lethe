/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useQuery, useMutation } from '@apollo/client'
import LetheInput from './lethe-input'
import alertConfig from './alerts-config'

const EditItemDialog = ({ item, listId, setShowDialog, show }) => {
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
    onError: (error) => {
      show({ ...alertConfig, message: error })
    },
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
        border: ({ colors }) => `1px solid ${colors.colorThree}`,
        backgroundColor: 'backgroundSecondary',
        webkitBoxShadow: '0px 0px 40px 12px rgba(0,0,0,0.72)',
        mozBoxShadow: '0px 0px 40px 12px rgba(0,0,0,0.72)',
        boxShadow: '0px 0px 40px 12px rgba(0,0,0,0.72)',
        margin: 3,
        padding: 3,
        color: 'textSecondary',
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
            color: 'textSecondary',
            marginBottom: 2,
          }}
        >
          Title
        </label>
        <LetheInput
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
              color: 'textSecondary',
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
