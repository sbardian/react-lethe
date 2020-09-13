/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import UpdateListTitleButton from '../buttons/update-list-title-button/update-list-title-button'

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
        <label
          htmlFor="edit-list-title"
          sx={{ display: 'grid', marginBottom: 2 }}
        >
          Title
          <input
            data-testid="lethe-input"
            aria-label="edit-list-title-input"
            aria-required="true"
            value={newTitle}
            id="edit-list-title"
            onChange={(event) => handleTitleChange(event)}
            sx={{
              color: 'textSecondary',
              borderRadius: '5px',
              lineHeight: 2,
              fontSize: 0,
              '@media (min-width: 430px)': {
                fontSize: 1,
                lineHeight: 2,
              },
            }}
          />
        </label>
      </div>
    </div>
  )
}

EditListTitle.propTypes = {
  listId: PropTypes.string.isRequired,
  orgTitle: PropTypes.string.isRequired,
}

export default EditListTitle
