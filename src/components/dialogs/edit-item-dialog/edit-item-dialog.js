/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import toastsConfig from '../../../utils/toasts-config'

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

const updateItemFailure = (e) => toast.error(e.message, toastsConfig)

const EditItemDialog = ({ item, listId, setShowDialog }) => {
  const [title, setTitle] = React.useState(item.title)
  const [createItemError, setEditItemError] = React.useState()

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
    onError: (updateItemError) => {
      updateItemFailure(updateItemError)
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
            display: 'grid',
            alignSelf: 'end',
            color: 'textSecondary',
            marginBottom: 2,
          }}
        >
          Title
          <input
            data-testid="lethe-input"
            aria-label="edit-item-input"
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

EditItemDialog.defaultProps = {
  item: null,
}

EditItemDialog.propTypes = {
  item: PropTypes.shape({
    __typename: PropTypes.string,
    creator: PropTypes.string,
    id: PropTypes.string,
    list: PropTypes.string,
    status: PropTypes.bool,
    title: PropTypes.string,
  }),
  listId: PropTypes.string.isRequired,
  setShowDialog: PropTypes.func.isRequired,
}

export default EditItemDialog
