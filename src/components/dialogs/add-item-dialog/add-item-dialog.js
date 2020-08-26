/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useMutation } from '@apollo/client'
import LetheInput from '../../lethe-input/lethe-input'
import alertsConfig from '../../../utils/alerts-config'

export const ADD_ITEM = gql`
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

export const GET_LIST_ITEMS = gql`
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

const AddItemDialog = ({ setShowDialog, listId, show }) => {
  const [title, setTitle] = React.useState('')
  const [createItemError, setCreateItemError] = React.useState()

  const handleChange = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const [createNewItem] = useMutation(ADD_ITEM, {
    onCompleted: () => {
      setShowDialog(false)
    },
    onError: (error) => {
      show({ ...alertsConfig, message: `${error}` })
      setCreateItemError(error.message)
    },
  })

  return (
    <div
      data-testid="add-list-item-dialog"
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: '1fr',
        border: ({ colors }) => `1px solid ${colors.colorThree}`,
        backgroundColor: 'background',
        webkitBoxShadow: '0px 0px 40px 12px rgba(0,0,0,0.72)',
        mozBoxShadow: '0px 0px 40px 12px rgba(0,0,0,0.72)',
        boxShadow: '0px 0px 40px 12px rgba(0,0,0,0.72)',
        color: 'textSecondary',
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
            marginBottom: 2,
          }}
        >
          Title
        </label>
        <LetheInput
          label="add-item"
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
            data-testid="submit"
            aria-label="submit"
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
            data-testid="cancel"
            aria-label="cancel"
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

export default AddItemDialog
