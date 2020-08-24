/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useQuery } from '@apollo/client'
import EditListTitle from './edit-list-title'

const ListSettings = ({ listId }) => {
  const GET_LIST = gql`
    query getLists($id_is: String!) {
      getLists(id_is: $id_is) {
        id
        title
      }
    }
  `

  const [orgTitle, setOrgTitle] = React.useState('')

  const { loading, error, data } = useQuery(GET_LIST, {
    variables: { id_is: listId },
  })

  React.useEffect(() => {
    if (data?.getLists[0]?.title) {
      setOrgTitle(data?.getLists[0]?.title)
    }
  }, [data])

  if (loading) {
    return <div>Loading . . . </div>
  }
  if (error) {
    return <div>Error: ${error.message}</div>
  }

  // const { getLists } = data

  // const [{ id, title }] = getLists

  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 3,
        alignContent: 'start',
        backgroundColor: 'colorTwo',
        margin: 0,
        padding: 3,
        height: '100%',
        fontSize: 1,
      }}
    >
      <span
        sx={{
          marginTop: 0,
        }}
      >
        {orgTitle} Settings
      </span>
      <EditListTitle listId={listId} orgTitle={orgTitle} />

      <div
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: '60px 1fr',
          gridTemplateRows: 'auto auto',
        }}
      ></div>
    </div>
  )
}

export default ListSettings
