/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { gql, useMutation } from '@apollo/client'

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
      css={css`
        display: grid;
        gap: 20px;
        grid-template-columns: 1fr;
        border: 1px solid white;
        background-color: #666;
        margin: 20px;
        padding: 20px;
      `}
    >
      <h2>Add List</h2>
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
          {createListError && (
            <div>{`Error creating item: ${createListError}`}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddListDialog
