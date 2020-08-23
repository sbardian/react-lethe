/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useMutation } from '@apollo/client'
import LetheInput from './lethe-input'

const AddListDialog = ({ setShowDialog, ...rest }) => {
  const [title, setTitle] = React.useState('')
  const [createListError, setCreateListError] = React.useState()

  const handleChange = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const ADD_LIST = gql`
    mutation createNewList($title: String!) {
      createNewList(ListInfo: { title: $title }) {
        id
        title
        owner
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
          owner
        }
      }
    }
  `

  const [createNewList, { error }] = useMutation(ADD_LIST, {
    onCompleted: () => setShowDialog(false),
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
          {createListError && (
            <div>{`Error creating item: ${createListError}`}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddListDialog
