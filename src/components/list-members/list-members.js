/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery, useMutation } from '@apollo/client'
import { jsx } from 'theme-ui'
import { toast } from 'react-toastify'
import { VscLoading } from 'react-icons/vsc'
import { FiDelete } from 'react-icons/fi'
import { AiFillCrown } from 'react-icons/ai'
import InviteMemberButton from '../buttons/invite-member-button/invite-member-button'
import Dialog from '../dialogs/dialog'
import AddListMemberDialog from '../dialogs/add-list-member-dialog/add-list-member-dialog'
import toastsConfig from '../../utils/toasts-config'
import ProfileImage from '../profile-image/profile-image'
import defaultProfileImage from '../../assets/images/default-profile-image.jpg'

const GET_MY_ID = gql`
  {
    getMyInfo {
      id
    }
  }
`

const GET_LIST_USERS = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      owner {
        id
      }
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

  const { data: myId } = useQuery(GET_MY_ID)

  const { loading, error, data } = useQuery(GET_LIST_USERS, {
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

  const [{ users, owner }] = data.getLists

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
          gridTemplateColumns: '1fr',
          '@media (min-width: 800px)': {
            gridTemplateColumns: '800px',
          },
        }}
      >
        {users &&
          users
            .slice(0)
            .reverse()
            .map((user) => {
              let ownerOfList = false
              let currentUserIsOwner = false
              const currentUserId = myId.getMyInfo.id
              if (user.id === owner.id) {
                ownerOfList = true
              }
              if (myId.getMyInfo.id === owner.id) {
                currentUserIsOwner = true
              }
              console.log('ownerOfList: ', ownerOfList)
              console.log('currentUserIsOwner: ', currentUserIsOwner)
              console.log('currentUserId: ', currentUserId)
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
                  <div
                    sx={{
                      display: 'grid',
                      gridTemplateRows: '1fr 30px',
                      gap: 2,
                      alignContent: 'center',
                      justifyItems: 'center',
                    }}
                  >
                    <ProfileImage
                      profileImageUrl={
                        user.profileImageUrl || defaultProfileImage
                      }
                      size="medium"
                      source={user.profileImageUrl ? 'firebase' : 'local'}
                    />
                    <div>{ownerOfList && <div>Owner</div>}</div>
                  </div>
                  <div
                    sx={{
                      display: 'grid',
                      gap: 3,
                      gridTemplateRows: 'auto auto',
                      justifySelf: 'center',
                      alignSelf: 'center',
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
                    {ownerOfList && <AiFillCrown size="30" />}
                    {currentUserIsOwner && !ownerOfList && (
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
                          '&:hover': {
                            color: 'colorThree',
                          },
                        }}
                      >
                        <FiDelete size="30" />
                      </button>
                    )}
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
