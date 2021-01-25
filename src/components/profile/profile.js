/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { jsx } from 'theme-ui'
import ProfileImage from '../profile-image/profile-image'

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

// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }

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
    // optimisticResponse: {
    //   __typename: 'Mutation',
    //   profileImageUpload: {
    //     __typename: 'User',
    //     profileImageUrl: file,
    //   },
    // },
  })

  const { loading: queryLoading, error: queryError, data } = useQuery(
    GET_MY_INFO,
  )

  if (queryLoading) {
    return <div>Loading . . . </div>
  }

  if (queryError) {
    return <div>Error: ${queryError.message}</div>
  }

  const {
    getMyInfo: { username, profileImageUrl, email },
  } = data

  return (
    <div
      sx={{
        backgroundColor: 'colorTwo',
      }}
    >
      {profileImageUrl && (
        <ProfileImage
          profileImageUrl={profileImageUrl}
          size="large"
          type="square"
        />
      )}
      <div
        sx={{
          padding: 3,
        }}
      >
        Profile
      </div>
      <div id="upload-box">
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
