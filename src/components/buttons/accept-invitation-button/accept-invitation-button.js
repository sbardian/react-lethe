/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { gql, useMutation } from '@apollo/client'
import { MdAddCircle } from 'react-icons/md'
import { VscLoading } from 'react-icons/vsc'

const ACCEPT_INVITATION = gql`
  mutation acceptInvitation($invitationId: String!) {
    acceptInvitation(invitationId: $invitationId) {
      id
      inviter {
        id
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

const AcceptInvitationButton = ({ invitationId }) => {
  const [acceptInvitation, { loading }] = useMutation(ACCEPT_INVITATION, {
    onCompleted: () => {},
    onError: () => {},
    variables: { invitationId },
  })

  if (loading) {
    return <VscLoading size="30" />
  }

  return (
    <MdAddCircle
      size="30"
      sx={{
        '&:hover': {
          color: 'chartreuse',
          cursor: 'pointer',
        },
      }}
      onClick={() =>
        acceptInvitation({
          variables: {
            invitationId,
          },
        })
      }
    />
  )
}

AcceptInvitationButton.propTypes = {
  invitationId: PropTypes.string.isRequired,
}

export default AcceptInvitationButton
