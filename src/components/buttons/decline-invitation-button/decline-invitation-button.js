/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { gql, useMutation } from '@apollo/client'
import { TiDelete } from 'react-icons/ti'
import { VscLoading } from 'react-icons/vsc'

const DECLINE_INVITATION = gql`
  mutation declineInvitation($invitationId: String!) {
    deleteInvitation(invitationId: $invitationId) {
      id
      inviter {
        id
      }
      invitee {
        id
      }
      list
      title
    }
  }
`

const DeclineInvitationButton = ({ invitationId }) => {
  const [declineInvitation, { loading }] = useMutation(DECLINE_INVITATION, {
    onCompleted: () => {},
    onError: () => {},
    variables: { invitationId },
  })

  if (loading) {
    return <VscLoading size="30" />
  }

  return (
    <TiDelete
      size="36"
      sx={{
        '&:hover': {
          color: 'chartreuse',
          cursor: 'pointer',
        },
      }}
      onClick={() =>
        declineInvitation({
          variables: {
            invitationId,
          },
        })
      }
    />
  )
}

DeclineInvitationButton.propTypes = {
  invitationId: PropTypes.string.isRequired,
}

export default DeclineInvitationButton
