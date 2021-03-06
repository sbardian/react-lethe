/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import toastsConfig from '../../../utils/toasts-config'

export const ADD_ITEM = gql`
  mutation createNewItem($listId: String!, $title: String!) {
    createNewItem(ItemInfo: { list: $listId, title: $title }) {
      id
      title
      creator {
        id
      }
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
        creator {
          id
        }
        list
        status
      }
    }
  }
`

const createNewItemSuccess = () =>
  toast.success('New item created successfully', toastsConfig)
const createNewItemFailure = (e) => toast.error(e.message, toastsConfig)

const AddItemDialog = ({ setShowDialog, listId }) => {
  const [title, setTitle] = React.useState('')
  const [createItemError, setCreateItemError] = React.useState()

  const handleChange = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const [createNewItem] = useMutation(ADD_ITEM, {
    onCompleted: () => {
      createNewItemSuccess()
      setShowDialog(false)
    },
    onError: (error) => {
      createNewItemFailure(error)
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
            display: 'grid',
            alignSelf: 'end',
            marginBottom: 2,
          }}
        >
          Title
          <input
            data-testid="lethe-input"
            aria-label="add-item-input"
            aria-required="true"
            sx={{
              color: 'textSecondary',
              borderRadius: '5px',
              lineHeight: 2,
              fontSize: 0,
              '@media (min-width: 430px)': {
                fontSize: 1,
                lineHeight: 2,
              },
            }}
            name="title"
            type="text"
            id="title"
            value={title}
            onChange={(event) => handleChange(event)}
          />
        </label>
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
              border: 'none',
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
              border: 'none',
              padding: 2,
              borderRadius: '10px',
              fontSize: 3,
              boxShadow: 'none',
              backgroundColor: 'transparent',
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

AddItemDialog.propTypes = {
  setShowDialog: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
}

export default AddItemDialog
