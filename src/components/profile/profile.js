/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { jsx } from 'theme-ui'
import { StorageContext } from '../contexts/storage-context/storage-context'

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
  const { storageRef, getImageUrl } = React.useContext(StorageContext)
  const [file, setFile] = React.useState('')
  const [profileImage, setProfileImage] = React.useState(null)

  // Handles file upload event and updates state
  function handleUpload(event) {
    console.log(event.target.files[0])
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

  const getImage = async () => {
    const url = await getImageUrl(profileImageUrl)
    setProfileImage(url)
  }

  getImage()

  return (
    <div
      sx={{
        backgroundColor: 'colorTwo',
      }}
    >
      {profileImage && (
        <img
          sx={{ borderRadius: '100%' }}
          height="150"
          width="150"
          src={profileImage}
          alt={username}
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
