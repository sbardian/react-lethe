/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { gql, useMutation } from '@apollo/client'
import { TiDelete } from 'react-icons/ti'
import { VscLoading } from 'react-icons/vsc'
import { toast } from 'react-toastify'
import toastsConfig from '../../../utils/toasts-config'

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

const declineInvitationSuccess = () =>
  toast.success('Invitation accepted successfully', toastsConfig)
const declineInvitationFailure = (e) => toast.error(e.message, toastsConfig)

const DeclineInvitationButton = ({ invitationId }) => {
  const [declineInvitation, { loading }] = useMutation(DECLINE_INVITATION, {
    onCompleted: () => {
      declineInvitationSuccess()
    },
    onError: (declineInvitationError) => {
      declineInvitationFailure(declineInvitationError)
    },
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
