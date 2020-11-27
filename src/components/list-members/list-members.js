/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery, useMutation } from '@apollo/client'
import { jsx } from 'theme-ui'
import { toast } from 'react-toastify'
import { VscLoading } from 'react-icons/vsc'
import { FiDelete } from 'react-icons/fi'
import InviteMemberButton from '../buttons/invite-member-button/invite-member-button'
import Dialog from '../dialogs/dialog'
import AddListMemberDialog from '../dialogs/add-list-member-dialog/add-list-member-dialog'
import toastsConfig from '../../utils/toasts-config'

const GET_LIST_USERS = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      owner
      users {
        id
        email
        username
        profileImageUrl
      }
    }
  }
`

const REMOVE_FROM_LIST = gql`
  mutation REMOVE_FROM_LIST($listId: String!, $userId: String!) {
    removeFromList(listId: $listId, userId: $userId) {
      id
      username
      email
    }
  }
`

const removeMemberFromListSuccess = () =>
  toast.success('Successfully removed member', toastsConfig)
const removeMemberFromListFailure = (e) => toast.error(e.message, toastsConfig)

const ListMembers = ({ listId }) => {
  const [showDialog, setShowDialog] = React.useState(false)

  const [removeFromList] = useMutation(REMOVE_FROM_LIST, {
    onComplete: () => {
      removeMemberFromListSuccess()
    },
    onError: (removeMemberError) => {
      removeMemberFromListFailure(removeMemberError)
    },
  })

  const { loading, error, data } = useQuery(GET_LIST_USERS, {
    variables: {
      id_is: listId,
    },
  })

  useQuery(GET_LIST_USERS, {
    variables: {
      id_is: listId,
    },
  })

  if (loading) {
    return (
      <div>
        <VscLoading size="34" />
      </div>
    )
  }

  if (error) {
    return <div>Error loading members: {error.message}</div>
  }

  const [{ users }] = data.getLists

  return (
    <div>
      <div
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <span>Members</span>
        <InviteMemberButton setShowDialog={setShowDialog} />
      </div>
      <div
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(auto-fit, 1fr)',
          '@media (min-width: 800px)': {
            gridTemplateColumns: 'repeat(auto-fill, 500px)',
          },
        }}
      >
        {users &&
          users.map((user) => {
            return (
              <div
                key={user.id}
                sx={{
                  display: 'grid',
                  gap: 3,
                  gridTemplateColumns: '1fr',
                  justifyItems: 'center',
                  alignItems: 'center',
                  backgroundColor: 'offWhite',
                  color: 'textSecondary',
                  borderRadius: '5px',
                  padding: 3,
                  '@media (min-width: 430px)': {
                    gridTemplateColumns: '140px 1fr 40px',
                  },
                }}
              >
                <img
                  src={`https://${user.profileImageUrl}/profileImage.jpg`}
                  alt={user.username}
                  width="100"
                  height="100"
                  sx={{
                    borderRadius: '100%',
                  }}
                />
                <div
                  sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateRows: 'auto auto',
                  }}
                >
                  <span>User: {user.username}</span>
                  <span>Email: {user.email}</span>
                </div>
                <div
                  sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateRows: 'auto',
                    justifySelf: 'end',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      removeFromList({
                        variables: {
                          listId,
                          userId: user.id,
                        },
                        refetchQueries: [
                          {
                            query: GET_LIST_USERS,
                            variables: {
                              id_is: listId,
                            },
                          },
                        ],
                      })
                    }}
                    sx={{
                      all: 'unset',
                      cursor: 'pointer',
                    }}
                  >
                    <FiDelete size="30" />
                  </button>
                </div>
              </div>
            )
          })}
      </div>
      <Dialog showDialog={showDialog}>
        <AddListMemberDialog setShowDialog={setShowDialog} listId={listId} />
      </Dialog>
    </div>
  )
}

ListMembers.propTypes = {
  listId: PropTypes.string.isRequired,
}

export default ListMembers
