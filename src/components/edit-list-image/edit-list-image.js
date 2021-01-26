/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { gql, useMutation, useQuery } from '@apollo/client'
import { jsx, Label } from 'theme-ui'
import ProfileImage from '../profile-image/profile-image'
// import UpdateListTitleButton from '../buttons/update-list-title-button/update-list-title-button'

const GET_LIST = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      title
      listImageUrl
    }
  }
`

const UPLOAD_LIST_IMAGE = gql`
  mutation updateList($listId: String!, $title: String!, $file: Upload) {
    updateList(listId: $listId, title: $title, file: $file) {
      listImageUrl
    }
  }
`

const EditListImage = ({ listId, title, orgImage }) => {
  const [file, setFile] = React.useState()
  const [newFileSelected, setNewFileSelected] = React.useState(false)

  const handleUpload = (event) => {
    setNewFileSelected(true)
    setFile(event.target.files[0])
  }

  const [imageUpload] = useMutation(UPLOAD_LIST_IMAGE, {
    variables: {
      listId,
      title,
      file,
    },
    onCompleted: () => {
      setFile(null)
      setNewFileSelected(null)
    },
    refetchQueries: [
      {
        query: GET_LIST,
        variables: {
          id_is: listId,
        },
      },
    ],
  })

  // React.useEffect(() => {
  //   setFile(orgImage)
  // }, [orgImage])

  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        backgroundColor: 'offWhite',
        padding: 2,
        alignItems: 'start',
        '@media (min-width: 430px)': {
          gap: 3,
          gridTemplateColumns: '1fr 3fr',
          gridTemplateRows: 'auto auto',
        },
      }}
    >
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'start',
        }}
      >
        Image
        <label htmlFor="edit-list-image" sx={{ marginBottom: 2 }}>
          <input
            data-testid="lethe-image-input"
            aria-label="edit-list-image-input"
            aria-required="true"
            type="file"
            id="edit-list-image"
            onChange={(event) => handleUpload(event)}
            sx={{
              color: 'textSecondary',
              borderRadius: '5px',
              lineHeight: 2,
              fontSize: 0,
              '@media (min-width: 430px)': {
                fontSize: 1,
                lineHeight: 2,
              },
            }}
          />
        </label>
        {/* {newFileSelected && (
          <React.Fragment> */}
        <input
          sx={{
            maxWidth: '100px',
            height: '30px',
          }}
          id="confirm-upload"
          accept="image/png, image/jpeg"
          type="button"
          value="Submit"
          onClick={() => imageUpload()}
        />
        {newFileSelected && (
          <div>
            <p>Filename: {file?.name}</p>
            <p>File type: {file?.type}</p>
            <p>File size: {file?.size} bytes</p>
          </div>
        )}
        {/* </React.Fragment>
        )} */}
      </div>
      <ProfileImage profileImageUrl={orgImage} size="large" />
    </div>
  )
}

EditListImage.propTypes = {
  listId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  orgImage: PropTypes.string.isRequired,
}

export default EditListImage
