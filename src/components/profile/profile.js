/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { jsx } from 'theme-ui'
import ProfileImage from '../profile-image/profile-image'
import defaultProfileImage from '../../assets/images/default-profile-image.jpg'

const UPLOAD_PROFILE_IMAGE = gql`
  mutation profileImageUpload($file: Upload!) {
    profileImageUpload(file: $file) {
      profileImageUrl
    }
  }
`

const GET_MY_INFO = gql`
  {
    getMyInfo {
      id
      username
      email
      profileImageUrl
      lists {
        title
      }
    }
  }
`

const Profile = () => {
  const [file, setFile] = React.useState('')

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0])
  }

  const [profileImageUpload] = useMutation(UPLOAD_PROFILE_IMAGE, {
    variables: {
      file,
    },
    onCompleted: () => {
      setFile(null)
    },
    refetchQueries: [
      {
        query: GET_MY_INFO,
      },
    ],

    // optimisticResponse: {
    //   __typename: 'Mutation',
    //   profileImageUpload: {
    //     __typename: 'User',
    //     profileImageUrl: file,
    //   },
    // },
  })

  const {
    loading: queryLoading,
    error: queryError,
    data,
  } = useQuery(GET_MY_INFO)

  if (queryLoading) {
    return <div>Loading . . . </div>
  }

  if (queryError) {
    return <div>Error: ${queryError.message}</div>
  }

  const {
    getMyInfo: { username, profileImageUrl, email },
  } = data

  console.log({ profileImageUrl })

  return (
    <div
      sx={{
        backgroundColor: 'colorTwo',
        padding: 3,
      }}
    >
      <ProfileImage
        profileImageUrl={profileImageUrl || defaultProfileImage}
        size="large"
        source={profileImageUrl ? 'firebase' : 'local'}
      />
      <div
        sx={{
          fontSize: 3,
        }}
      >
        Profile
      </div>
      <div
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'minmax(200px, 500px)',
        }}
      >
        <label
          sx={{
            display: 'grid',
            color: 'textSecondary',
            alignSelf: 'end',
            marginTop: 2,
            fontSize: 1,
          }}
          htmlFor="username-input"
        >
          Username
          <input
            sx={{
              color: 'textSecondary',
              borderRadius: '5px',
              fontSize: 1,
            }}
            type="text"
            id="username-input"
            value={username}
            onChange={() => console.log('change')}
          />
        </label>
        <label
          htmlFor="email-input"
          sx={{
            display: 'grid',
            color: 'textSecondary',
            alignSelf: 'end',
            marginTop: 2,
            fontSize: 1,
          }}
        >
          Email
          <input
            sx={{
              color: 'textSecondary',
              borderRadius: '5px',
              fontSize: 1,
            }}
            type="text"
            id="email-input"
            value={email}
            onChange={() => console.log('change')}
          />
        </label>
      </div>
      <div
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: '200px',
          marginTop: 3,
        }}
        id="upload-box"
      >
        <input
          type="file"
          onChange={(event) => {
            handleUpload(event)
          }}
        />
        <input
          id="confirm-upload"
          type="button"
          onClick={() => profileImageUpload()}
          value="Submit"
        />
        {file && (
          <div>
            <p>Filename: {file.name}</p>
            <p>File type: {file.type}</p>
            <p>File size: {file.size} bytes</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
