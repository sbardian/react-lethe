/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { MdAddCircle } from 'react-icons/md'
import { VscLoading } from 'react-icons/vsc'
import toastsConfig from '../../../utils/toasts-config'

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

interface InvitationError {
  message: string
}

const acceptInvitationSuccess = () =>
  toast.success('Invitation accepted successfully', toastsConfig)
const acceptInvitationFailure = (e: InvitationError) =>
  toast.error(e.message, toastsConfig)

const AcceptInvitationButton = ({ invitationId }: { invitationId: string }) => {
  const [acceptInvitation, { loading }] = useMutation(ACCEPT_INVITATION, {
    onCompleted: () => {
      acceptInvitationSuccess()
    },
    onError: (acceptInvitationError) => {
      acceptInvitationFailure(acceptInvitationError)
    },
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
