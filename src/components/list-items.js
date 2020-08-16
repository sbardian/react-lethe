/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { gql, useQuery } from '@apollo/client'
import { useNavigate } from '@reach/router'
import { BsCheckBox } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { RiCheckboxBlankLine } from 'react-icons/ri'
import { MenuContext } from './menu-context'

const ListItems = ({ listId }) => {
  const { activeItemTab, setActiveItemTab } = React.useContext(MenuContext)
  const [displayedItems, setDisplayedItems] = React.useState()

  const navigate = useNavigate()

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
    <div
      css={css`
        background-color: #e1e1e1;
        margin: 0;
        height: 100%;
      `}
    >
      <ul
        css={css`
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(auto-fill, 200px);
          list-style: none;
          padding: 10px 20px 20px 20px;
        `}
      >
        {displayedItems &&
          displayedItems.map((item) => (
            <li
              key={item.id}
              css={css`
                border: 1px solid #666;
                background-color: #f1f1f1;
                padding: 10px;
                &:hover {
                  -webkit-box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.66);
                  -moz-box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.66);
                  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.66);
                  background-color: #fff;
                }
              `}
            >
              <div
                css={css`
                  display: grid;
                  grid-template-columns: 1fr;
                  grid-template-rows: 1fr 1fr;
                  height: 100%;
                  width: 100%;
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
                  <div
                    css={css`
                      align-self: end;
                    `}
                  >
                    {item.status ? (
                      <BsCheckBox
                        size="30"
                        css={css`
                          color: ${item.status ? 'green' : '#666'};
                        `}
                      />
                    ) : (
                      <RiCheckboxBlankLine size="30" />
                    )}
                  </div>
                  <div
                    css={css`
                      align-self: end;
                      cursor: pointer;
                    `}
                    onClick={() => {
                      navigate(`/editItem/${item.id}`)
                    }}
                  >
                    <AiOutlineEdit size="30" />
                  </div>
                  <div
                    css={css`
                      align-self: end;
                    `}
                  >
                    <TiDeleteOutline size="30" />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ListItems
