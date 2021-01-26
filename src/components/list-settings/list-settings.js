/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { gql, useQuery } from '@apollo/client'
import EditListTitle from '../edit-list-title/edit-list-title'
import EditListImage from '../edit-list-image/edit-list-image'
import ListMembers from '../list-members/list-members'

const GET_LIST = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      title
      listImageUrl
    }
  }
`

const ListSettings = ({ listId }) => {
  const [orgTitle, setOrgTitle] = React.useState('')
  const [orgImage, setOrgImage] = React.useState('')

  const { loading, error, data } = useQuery(GET_LIST, {
    variables: { id_is: listId },
  })

  React.useEffect(() => {
    if (data?.getLists[0]?.title) {
      setOrgTitle(data.getLists[0].title)
    }
    if (data?.getLists[0]?.listImageUrl) {
      setOrgImage(data.getLists[0].listImageUrl)
    }
  }, [data])

  if (loading) {
    return <div>Loading . . . </div>
  }
  if (error) {
    return <div>Error: ${error.message}</div>
  }

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
      <EditListImage listId={listId} title={orgTitle} orgImage={orgImage} />
      <ListMembers listId={listId} />
    </div>
  )
}

ListSettings.propTypes = {
  listId: PropTypes.string.isRequired,
}

export default ListSettings
