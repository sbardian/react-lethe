/** @jsx jsx */
import { jsx } from 'theme-ui'
import { gql, useQuery } from '@apollo/client'
import { GiSadCrab } from 'react-icons/gi'
import AcceptInvitationButton from '../buttons/accept-invitation-button/accept-invitation-button'
import DeclineInvitationButton from '../buttons/decline-invitation-button/decline-invitation-button'
import FirebaseImage from '../firebase-image/firebase-image'
import ProfileImage from '../profile-image/profile-image'

const GET_MY_INVITATIONS = gql`
  {
    getMyInfo {
      id
      invitations {
        id
        inviter {
          id
          username
          email
          profileImageUrl
        }
        invitee {
          id
          username
          email
          profileImageUrl
        }
        title
      }
    }
  }
`

const INVITATION_ADDED = gql`
  subscription onInvitationAdded {
    invitationAdded {
      id
      title
      invitee {
        id
        username
        email
        profileImageUrl
      }
      inviter {
        id
        username
        email
        profileImageUrl
      }
    }
  }
`

const INVITATION_DELETED = gql`
  subscription onInvitationDeleted {
    invitationDeleted {
      id
      title
      invitee {
        id
        username
        email
        profileImageUrl
      }
      inviter {
        id
        username
        email
        profileImageUrl
      }
    }
  }
`

const Invitations = () => {
  const { subscribeToMore, loading, error, data } = useQuery(GET_MY_INVITATIONS)
  if (loading) {
    return <div>Loading . . . </div>
  }
  if (error) {
    return <div>Error: ${error.message}</div>
  }

  const {
    getMyInfo: { invitations },
  } = data

  subscribeToMore({
    document: INVITATION_ADDED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const { id } = subscriptionData.data.invitationAdded
      if (!prev.getMyInfo.invitations.some((invite) => invite.id === id)) {
        const newInvitations = {
          ...prev,
          getMyInfo: {
            ...prev.getMyInfo,
            invitations: [
              { ...subscriptionData.data.invitationAdded },
              ...prev.getMyInfo.invitations,
            ],
          },
        }
        return newInvitations
      }
      return prev
    },
  })
  subscribeToMore({
    document: INVITATION_DELETED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const { id } = subscriptionData.data.invitationDeleted
      if (prev.getMyInfo.invitations.some((invite) => invite.id === id)) {
        const filteredInvitations = prev.getMyInfo.invitations.filter(
          (invite) => invite.id !== id,
        )
        const newInvitations = {
          ...prev,
          getMyInfo: {
            ...prev.getMyInfo,
            invitations: [...filteredInvitations],
          },
        }
        return newInvitations
      }
      return prev
    },
  })

  return (
    <div
      sx={{
        backgroundColor: 'colorTwo',
      }}
    >
      <div
        sx={{
          padding: 3,
        }}
      >
        <div
          sx={{
            fontSize: 4,
            paddingBottom: 3,
          }}
        >
          Invitations
        </div>
        <ul
          sx={{
            all: 'unset',
            display: 'grid',
            gap: 3,
          }}
        >
          {invitations.length === 0 ? (
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 30px',
                gap: 3,
                justifyContent: 'center',
                alignContent: 'center',
                fontSize: 2,
              }}
            >
              You have no invitations. <GiSadCrab size="30" />
            </div>
          ) : (
            invitations.map((invite) => (
              <li
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 3,
                  padding: 3,
                  borderRadius: '10px',
                  webkitBoxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                  mozBoxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                  boxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                  fontSize: 2,
                  backgroundColor: 'background',
                  '@media (min-width: 800px)': {
                    gridTemplateColumns: '200px 1fr 60px',
                  },
                }}
              >
                <FirebaseImage
                  sx={{
                    alignSelf: 'center',
                    height: '150px',
                    width: '150px',
                    borderRadius: '100%',
                    webkitBoxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                    mozBoxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                    boxShadow: '0px 0px 6px -1px rgba(0, 0, 0, 0.66)',
                  }}
                  profileImageUrl={invite.inviter.profileImageUrl}
                  alt={invite.inviter.username}
                  height="150"
                  width="150"
                />
                <div
                  sx={{
                    display: 'grid',
                    gridTemplateRows: '1fr 1fr',
                    gap: 2,
                  }}
                >
                  <div
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '50px 1fr',
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                  >
                    <ProfileImage
                      profileImageUrl={invite.inviter.profileImageUrl}
                      size="small"
                      type="circle"
                    />
                    {invite.inviter.username} has invited you to join a list!
                  </div>
                  <div>Message: {invite.title}</div>
                </div>
                <div
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 3,
                    alignItems: 'center',
                    justifyItems: 'center',
                    '@media (min-width: 800px)': {
                      gridTemplateColumns: '1fr',
                      gridTemplateRows: '1fr 1fr',
                    },
                  }}
                >
                  <AcceptInvitationButton invitationId={invite.id} />
                  <DeclineInvitationButton invitationId={invite.id} />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default Invitations
