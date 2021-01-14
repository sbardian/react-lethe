/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { toast } from 'react-toastify'
import { gql, useMutation } from '@apollo/client'
import toastsConfig from '../../../utils/toasts-config'

const ADD_LIST = gql`
  mutation createNewList($title: String!) {
    createNewList(ListInfo: { title: $title }) {
      id
      title
    }
  }
`

const GET_MY_LISTS = gql`
  {
    getMyInfo {
      id
      lists {
        id
        title
      }
    }
  }
`

const createNewListSuccess = () =>
  toast.success('New list created successfully', toastsConfig)
const createNewListFailure = (e) => toast.error(e.message, toastsConfig)

const AddListDialog = ({ setShowDialog }) => {
  const [title, setTitle] = React.useState('')
  const [createListError, setCreateListError] = React.useState()

  const handleChange = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const [createNewList, { error }] = useMutation(ADD_LIST, {
    onCompleted: () => {
      createNewListSuccess()
      setShowDialog(false)
    },
    onError: (createNewListError) => {
      createNewListFailure(createNewListError)
    },
  })

  if (error) {
    setCreateListError(error.message)
  }

  return (
    <div
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
      <h2>Add List</h2>
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
            aria-label="add-list-input"
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
                createNewList({
                  variables: { title },
                  refetchQueries: [{ query: GET_MY_LISTS }],
                })
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
          {createListError && (
            <div>{`Error creating item: ${createListError}`}</div>
          )}
        </div>
      </div>
    </div>
  )
}

AddListDialog.propTypes = {
  setShowDialog: PropTypes.func.isRequired,
}

export default AddListDialog
