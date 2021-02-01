/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { FiDelete } from 'react-icons/fi'

interface DeleteListButtonProps {
  onDeleteList: (listId: string) => null
  listId: string
}

// TODO: lists not updating after deleting list
const DeleteListButton: React.FC<DeleteListButtonProps> = ({
  onDeleteList,
  listId,
}) => (
  <button
    data-testid="delete-list-button"
    aria-label="delete list"
    tabIndex={0}
    type="button"
    onClick={() => onDeleteList(listId)}
    sx={{
      border: 'none',
      backgroundColor: 'transparent',
      display: 'grid',
      color: 'inherit',
      cursor: 'pointer',
      // justifySelf: 'end',
      alignSelf: 'center',
    }}
  >
    <FiDelete size="30" />
  </button>
)

DeleteListButton.propTypes = {
  onDeleteList: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
}

export default DeleteListButton
