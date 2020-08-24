/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useQuery, useMutation } from '@apollo/client'
import UpdateListTitleButton from './update-list-title-button'
import LetheInput from './lethe-input'

const EditListTitle = ({ listId, orgTitle }) => {
  const [newTitle, setNewTitle] = React.useState('')
  const [titleNotUpdated, setTitleNotUpdated] = React.useState(true)

  const handleTitleChange = (event) => {
    event.preventDefault()
    const { value } = event.target
    setTitleNotUpdated(false)
    setNewTitle(value)
  }

  React.useEffect(() => {
    setNewTitle(orgTitle)
  }, [orgTitle])

  return (
    <div
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: '60px 1fr',
        gridTemplateRows: 'auto auto',
      }}
    >
      <UpdateListTitleButton
        listId={listId}
        newTitle={newTitle}
        titleNotUpdated={titleNotUpdated}
        setTitleNotUpdated={setTitleNotUpdated}
      />
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
        }}
      >
        <label htmlFor="edit-list-title" sx={{ marginBottom: 2 }}>
          Title
        </label>
        <LetheInput
          value={newTitle}
          id="edit-list-title"
          onChange={(event) => handleTitleChange(event)}
        />
      </div>
    </div>
  )
}

export default EditListTitle
