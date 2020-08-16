/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { gql, useQuery } from '@apollo/client'
import { Link } from '@reach/router'
import { BsCheckBox } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { MenuContext } from './menu-context'

const ListItems = ({ listId }) => {
  const { activeItemTab, setActiveItemTab } = React.useContext(MenuContext)
  const [displayedItems, setDisplayedItems] = React.useState()

  const editItem = () => {
    console.log('EDIT ITEM')
  }

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

  const { loading, error, data } = useQuery(GET_LIST_ITEMS, {
    variables: {
      id_is: listId,
    },
  })

  React.useEffect(() => {
    if (data?.getLists[0]?.items) {
      const displayItems = data.getLists[0].items.filter((item) => {
        let result
        if (!activeItemTab) {
          if (!item.status) {
            result = true
          }
        } else {
          if (item.status) {
            result = true
          }
        }
        return result
      })
      setDisplayedItems(displayItems)
    }
  }, [data, activeItemTab])

  if (loading)
    return (
      <p
        css={css`
          color: #666;
        `}
      >
        Loading...
      </p>
    )
  if (error) return <p>{`ERROR: ${error}`}</p>
  if (!data) return <p>You currently have no lists. Create some!</p>

  const [{ items }] = data?.getLists

  return (
    <ul
      css={css`
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fill, 200px);
        grid-template-rows: repeat(auto-fit, 100px);
        list-style: none;
        padding-left: 0;
        margin: 0;
        height: 100%;
      `}
    >
      {displayedItems &&
        displayedItems.map((item) => (
          <li
            key={item.id}
            css={css`
              display: grid;
              gap: 10px;
              grid-template-columns: 1fr;
              grid-template-rows: 1fr 1fr;
              border: 1px solid #666;
              padding: 10px;
              background-color: #f1f1f1;
              &:hover {
                -webkit-box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.66);
                -moz-box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.66);
                box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.66);
                background-color: #fff;
              }
            `}
          >
            <span>{item.title}</span>
            <div
              css={css`
                display: grid;
                grid-template-columns: repeat(3, 40px);
                justify-content: end;
                gap: 5px;
              `}
            >
              <div>
                <BsCheckBox size="30" />
              </div>
              <div>
                <AiOutlineEdit size="30" />
              </div>
              <div>
                <TiDeleteOutline size="30" />
              </div>
            </div>
          </li>
        ))}
    </ul>
  )
}

export default ListItems
