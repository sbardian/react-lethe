/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from '@reach/router'
import { RiPlayListAddLine } from 'react-icons/ri'

const AddListDialog = ({ setShowDialog }) => {
  const navigate = useNavigate()
  const [title, setTitle] = React.useState('')

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

  const [createNewList, { loading, error }] = useMutation(ADD_LIST, {
    onCompleted: () => setShowDialog(false),
  })

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
        <h2>Add List Dialog</h2>
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
                  createNewList({
                    variables: { title },
                    refetchQueries: [{ query: GET_MY_LISTS }],
                  })
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddListDialog
