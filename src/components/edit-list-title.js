/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { AlertWrapper } from 'react-alerts-plus'
import UpdateListTitleButton from './update-list-title-button'
import LetheInput from './lethe-input'

const EditListTitle = ({ listId, orgTitle }) => {
  const [newTitle, setNewTitle] = React.useState('')
  const [titleNotUpdated, setTitleNotUpdated] = React.useState(true)

  const handleTitleChange = (event) => {
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
        gridTemplateColumns: '1fr',
        '@media (min-width: 430px)': {
          gap: 3,
          gridTemplateColumns: '60px 1fr',
          gridTemplateRows: 'auto auto',
        },
      }}
    >
      <AlertWrapper>
        {({ show }) => (
          <UpdateListTitleButton
            listId={listId}
            newTitle={newTitle}
            titleNotUpdated={titleNotUpdated}
            setTitleNotUpdated={setTitleNotUpdated}
            show={show}
          />
        )}
      </AlertWrapper>
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
