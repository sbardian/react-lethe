/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { FiDelete } from 'react-icons/fi'
import toastsConfig from '../../../utils/toasts-config'

interface RemoveUserFromListButtonProps {
  userId: string
  listId: string
}

const REMOVE_FROM_LIST = gql`
  mutation REMOVE_FROM_LIST($listId: String!, $userId: String!) {
    removeFromList(listId: $listId, userId: $userId) {
      id
      username
      email
    }
  }
`

// TODO: lists not updating after deleting list
const RemoveUserFromListButton: React.FC<RemoveUserFromListButtonProps> = ({
  userId,
  listId,
}) => {
  const removeMemberFromListSuccess = () =>
    toast.success('Successfully removed member', toastsConfig)
  const removeMemberFromListFailure = ({ message }: { message: string }) =>
    toast.error(message, toastsConfig)

  const [removeFromList] = useMutation(REMOVE_FROM_LIST, {
    onCompleted: () => {
      removeMemberFromListSuccess()
    },
    onError: (removeMemberError) => {
      removeMemberFromListFailure(removeMemberError)
    },
  })

  return (
    <button
      data-testid="remove-user-list-button"
      aria-label="remove users list"
      tabIndex={0}
      type="button"
      onClick={() =>
        removeFromList({
          variables: {
            listId,
            userId,
          },
        })
      }
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
}

RemoveUserFromListButton.propTypes = {
  userId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
}

export default RemoveUserFromListButton
