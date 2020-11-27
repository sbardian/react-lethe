/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { toast } from 'react-toastify'
import { gql, useMutation } from '@apollo/client'
import toastsConfig from '../../../utils/toasts-config'

const SEND_INVITATION = gql`
  mutation createInvitation(
    $listId: String!
    $invitee: String!
    $title: String!
  ) {
    createInvitation(listId: $listId, invitee: $invitee, title: $title) {
      id
      inviter {
        id
        username
        profileImageUrl
      }
      invitee {
        id
        username
        profileImageUrl
        email
      }
      list
      title
    }
  }
`

const createInvitationSuccess = () =>
  toast.success('Invitation created successfully', toastsConfig)
const createInvitationFailure = (e) => toast.error(e.message, toastsConfig)

const AddListMemberDialog = ({ setShowDialog, listId }) => {
  const [invitee, setInvitee] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [createListError, setCreateListError] = React.useState()

  const handleInviteeChange = (event) => {
    event.preventDefault()
    setInvitee(event.target.value)
  }

  const handleMessageChange = (event) => {
    event.preventDefault()
    setMessage(event.target.value)
  }

  const [
    createInvitation,
    { loading: createInvitationLoading, error },
  ] = useMutation(SEND_INVITATION, {
    variables: {
      listId,
      title: message,
      invitee,
    },
    onCompleted: () => {
      createInvitationSuccess()
      setInvitee('')
      setMessage('')
      setShowDialog(false)
    },
    onError: (mutationError) => {
      createInvitationFailure()
    },
  })

  if (createInvitationLoading) {
    return <div>Loading . . . </div>
  }
  if (error) {
    return <div>Error: ${error.message}</div>
  }

  return (
    <div
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: '1fr',
        border: ({ colors }) => `1px solid ${colors.colorThree}`,
        backgroundColor: 'background',
        webkitBoxShadow: '0px 0px 40px 12px rgba(0,0,0,0.72)',
        mozBoxShadow: '0px 0px 40px 12px rgba(0,0,0,0.72)',
        boxShadow: '0px 0px 40px 12px rgba(0,0,0,0.72)',
        color: 'textSecondary',
        margin: 3,
        padding: 3,
      }}
    >
      <h2>Add List Member</h2>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          fontSize: 1,
        }}
      >
        <label
          htmlFor="member"
          sx={{
            display: 'grid',
            alignSelf: 'end',
            color: 'textSecondary',
            marginBottom: 2,
          }}
        >
          Member username or email address
          <input
            data-testid="lethe-input"
            aria-label="add-list-member-input"
            aria-required="true"
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
            name="member"
            type="text"
            id="member"
            value={invitee}
            onChange={(event) => handleInviteeChange(event)}
          />
        </label>
        <label
          htmlFor="message"
          sx={{
            display: 'grid',
            alignSelf: 'end',
            color: 'textSecondary',
            marginBottom: 2,
          }}
        >
          Message
          <input
            data-testid="lethe-input"
            aria-label="add-list-member-message-input"
            aria-required="true"
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
            name="message"
            type="text"
            id="message"
            value={message}
            onChange={(event) => handleMessageChange(event)}
          />
        </label>
        <div
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: '1fr',
            alignContent: 'start',
            marginTop: 3,
            '@media (min-width: 430px)': {
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'auto',
            },
          }}
        >
          <button
            type="submit"
            sx={{
              border: 'none',
              padding: 2,
              borderRadius: '10px',
              fontSize: 3,
              boxShadow: 'none',
              backgroundColor: 'colorThree',
              color: 'text',
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (invitee) {
                console.log('calling mutation')
                createInvitation()
              }
            }}
          >
            Submit
          </button>
          <button
            type="submit"
            sx={{
              border: 'none',
              padding: 2,
              borderRadius: '10px',
              fontSize: 3,
              boxShadow: 'none',
              backgroundColor: 'transparent',
              color: 'textSecondary',
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              setShowDialog(false)
            }}
          >
            Cancel
          </button>
          {createListError && (
            <div>{`Error creating item: ${createListError}`}</div>
          )}
        </div>
      </div>
    </div>
  )
}

AddListMemberDialog.propTypes = {
  setShowDialog: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
}

export default AddListMemberDialog
