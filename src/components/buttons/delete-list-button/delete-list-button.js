/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { FiDelete } from 'react-icons/fi'

const DeleteListButton = ({ onDeleteList, listId }) => {
  return (
    <div
      data-testid="delete-list-button"
      aria-label="delete list"
      type="button"
      onClick={() => onDeleteList(listId)}
      sx={{
        display: 'grid',
        color: 'inherit',
        cursor: 'pointer',
        justifySelf: 'end',
        alignSelf: 'center',
      }}
    >
      <FiDelete size="30" />
    </div>
  )
}

DeleteListButton.propTypes = {
  onDeleteList: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
}

export default DeleteListButton
