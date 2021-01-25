/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { StorageContext } from '../contexts/storage-context/storage-context'

const FirebaseImage = ({ profileImageUrl, height, width, type }) => {
  const { getImageUrl } = React.useContext(StorageContext)
  const [imageUrl, setImageUrl] = React.useState()

  React.useEffect(() => {
    getImageUrl(profileImageUrl).then((url) => setImageUrl(url))
  }, [profileImageUrl])

  return (
    <img
      sx={{
        borderRadius: type === 'circle' ? '100%' : '0px',
      }}
      src={imageUrl}
      height={height}
      width={width}
      alt="creator"
    />
  )
}

FirebaseImage.defaultProps = {
  type: 'square',
}

FirebaseImage.propTypes = {
  profileImageUrl: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  type: PropTypes.string,
}

export default FirebaseImage
