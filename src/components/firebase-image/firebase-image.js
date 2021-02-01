/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { StorageContext } from '../contexts/storage-context/storage-context'

const FirebaseImage = ({ imageUrl, height, width, type, alt }) => {
  const { getImageUrl } = React.useContext(StorageContext)
  const [firebaseImageUrl, setFirebaseImageUrl] = React.useState()

  React.useEffect(() => {
    if (imageUrl) {
      getImageUrl(imageUrl).then((url) => setFirebaseImageUrl(url))
    }
  }, [imageUrl])

  // TODO: grab more metadata about the image while fetching the download URL, so we can size it correctly
  return (
    <img
      sx={{
        borderRadius: type === 'circle' ? '100%' : '0px',
      }}
      src={firebaseImageUrl}
      height={height}
      width={width}
      alt={alt}
    />
  )
}

FirebaseImage.defaultProps = {
  type: 'square',
  alt: 'image',
}

FirebaseImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  type: PropTypes.string,
  alt: PropTypes.string,
}

export default FirebaseImage
