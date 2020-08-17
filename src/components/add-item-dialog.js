/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from '@reach/router'
import { RiPlayListAddLine } from 'react-icons/ri'

const AddItemDialog = ({ setShowDialog, listId }) => {
  const navigate = useNavigate()
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
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        @media (min-width: 800px) {
          width: 600px;
        }
      `}
    >
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
        <h2>Add Item Dialog</h2>
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
              font-size: 1.5rem;
              height: 2rem;
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
              grid-template-columns: 1fr 1fr;
              grid-template-rows: auto;
              gap: 20px;
              align-content: start;
              margin-top: 20px;
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
    </div>
  )
}

export default AddItemDialog
