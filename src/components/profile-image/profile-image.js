/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { StorageContext } from '../contexts/storage-context/storage-context'

const ProfileImage = ({ profileImageUrl, height, width }) => {
  const { getImageUrl } = React.useContext(StorageContext)
  const [imageUrl, setImageUrl] = React.useState()

  React.useEffect(() => {
    getImageUrl(profileImageUrl).then((url) => setImageUrl(url))
  }, [profileImageUrl])

  return (
    <img
      sx={{
        borderRadius: '100%',
      }}
      src={imageUrl}
      height={height}
      width={width}
      alt="creator"
    />
  )
}

ProfileImage.propTypes = {
  profileImageUrl: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
}

export default ProfileImage
